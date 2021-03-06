const router = require("express").Router();
const { body, matchedData, param } = require("express-validator");
const {
  Token,
  Image,
  Employee,
  Variant,
  Product,
  Category,
  Log,
} = require("../models");
const {
  randomString,
  validateResultMiddleware,
  AdminOnly,
} = require("../libraries/helpers");
const passport = require("passport");
const upload = require("../libraries/multer");
const sequelize = require("../libraries/sequelize");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.post(
  "/add",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  [
    body("productId").notEmpty().isNumeric(),
    body("name").notEmpty().isString(),
    body("price").notEmpty().isNumeric(),
    body("stock").notEmpty().isNumeric(),
  ],
  validateResultMiddleware,

  async (req, res) => {
    const { productId, name, stock, price } = matchedData(req, {
      locations: ["body"],
    });

    try {
      const newVariant = await Variant.create({
        productId,
        name,
        price,
        stock,
        createdBy: req.user.id
      }, {
        include: [Product]
      });

      await Log.create({
        createdBy: req.user.id,
        variantId: newVariant.id,
        description: `Created variant "${name}" for product "${newVariant?.product?.name}".`
      })

      res.send(newVariant);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

//GET ALL
router.get(
  "/all",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const variants = await Variant.findAll({
        include: [
          {
            model: Product,
            include: [Category],
          },
          Image,
        ],
      });

      res.send({ variants });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,
  async (req, res) => {
    try {
      await Variant.destroy({
        where: {
          id: req.params.id,
        },
      });

      await Log.create({
        createdBy: req.user.id,
        description: `Deleted a variant with ID ${req.params.id}.`
      })

      res.send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  [
    body("name").notEmpty().isString(),
    body("stock").notEmpty().isNumeric(),
    body("price").notEmpty().isNumeric(),
  ],
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,

  async (req, res) => {
    const { name, stock, price } = matchedData(req, {
      locations: ["body"],
    });

    try {
      await Variant.update(
        {
          name,
          stock,
          price,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      await Log.create({
        createdBy: req.user.id,
        variantId: req.params.id,
        description: `Updated variant ID#${req.params.id}.`
      })

      res.send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/changeImage/:id",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  [param("id").notEmpty().isNumeric()],
  validateResultMiddleware,
  upload.single("image"),

  async (req, res) => {
    if (!req.file) {
      return res.status(422).send("Image not found");
    }
    const newImage = await Image.create({
      location: req.file.link,
      createdBy: req.user.id,
    });

    Variant.update(
      {
        imageId: newImage.id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    await Log.create({
      createdBy: req.user.id,
      variantId: req.params.id,
      description: `Changed the image of variant ID#${req.params.id}.`
    })

    res.send();
  }
);

router.get("/allByProduct", async (req, res) => {
  try {
    const variants = await Variant.findAll({
      include: Image,
    });

    res.send({ variants });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET VARIANT BY PRODUCT
router.get(
  "/getByProductPaginate",
  passport.authenticate("bearer", { session: false }),
  body("productId").notEmpty().isNumeric(),
  body("limit").notEmpty().isNumeric(),
  body("lastId").notEmpty().isNumeric(),
  validateResultMiddleware,
  async (req, res) => {
    const { limit, lastId, productId } = matchedData(req, {
      locations: ["body"],
    });
    const cursor = lastId || 0;
    try {
      const variants = await Variant.findAll({
        limit: limit,
        where: {
          id: {
            [Op.gt]: cursor,
          },
          productId,
        },
      });
      res.send({
        variants,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/search/:keyword",
  passport.authenticate("bearer", { session: false }),
  param("keyword").notEmpty().isString(),
  validateResultMiddleware,
  async (req, res) => {
    const query = `%${req.params.keyword}%`;

    let output = [];

    const variants = await Variant.findAll({
      where: {
        name: {
          [Op.iLike]: query,
        },
      },
      include: [
        {
          model: Product,
          include: [Category],
        },
        Image,
      ],
    });

    output = [...variants];

    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: query,
        },
      },
      include: [
        {
          model: Variant,
          include: [
            {
              model: Product,
              include: [Category],
            },
            Image,
          ],
        },
      ],
    });

    products.forEach((product) => {
      product.variants.forEach((variant) => {
        if (output.find((v1) => v1.id == variant.id)) return;
        output.push(variant);
      });
    });

    res.send({ variants: output });
  }
);

module.exports = router;
