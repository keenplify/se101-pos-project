const router = require("express").Router();
const { body, matchedData, param } = require("express-validator");
const { Token, Image, Employee, Variant } = require("../models");
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
      });

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
      const variants = await Variant.findAll();

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
    body("productId").notEmpty().isNumeric(),
    body("name").notEmpty().isString(),
    body("stock").notEmpty().isNumeric(),
  ],
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,

  async (req, res) => {
    const { productId, name, stock } = matchedData(req, {
      locations: ["body"],
    });

    try {
      await Employee.update(
        {
          productId,
          name,
          stock,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      res.send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/:id/changeImage",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  [
    param("id").notEmpty().isNumeric(),
  ],
  validateResultMiddleware,
  upload.single("image"),
  
  async (req, res) => {
    if (!req.file) {
      return res.status(422).send("Image not found");
    }
    const newImage = await Image.create({
      location: req.file.path,
      createdBy: req.user.id,
    });

    try {
      const newVariant = await Variant.create({
        imageId: newImage.id
      },
      {
        where:{
          id:req.param.id
        }
      }
      );


      res.send(newVariant);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
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

module.exports = router;
