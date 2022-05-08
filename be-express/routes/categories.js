const router = require("express").Router();
const { Category, Image, Product, Variant, Log } = require("../models");
const { body, matchedData, param } = require("express-validator");
const { validateResultMiddleware, AdminOnly } = require("../libraries/helpers");
const passport = require("passport");
const upload = require("../libraries/multer");

router.post(
  "/add",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  [
    body("name").notEmpty().isString(),
    body("description").notEmpty().isString(),
  ],
  validateResultMiddleware,
  async (req, res) => {
    const { name, description } = matchedData(req, {
      locations: ["body"],
    });

    try {
      const newCategory = await Category.create({
        name,
        description,
        createdBy: req.user.id,
      });

      await Log.create({
        createdBy: req.user.id,
        categoryId: newCategory.id,        
        description: `A new category named "${name}" has been added. (ID#${newCategory.id})`
      })

      res.send({ newCategory });
    } catch (error) {
      console.log(error);
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
      await Category.destroy({
        where: {
          id: req.params.id,
        },
      });

      await Log.create({
        createdBy: req.user.id,
        description: `Category ID#${req.params.id} has been deleted.`
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
    body("description").notEmpty().isString(),
  ],
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,

  async (req, res) => {
    const { name, description } = matchedData(req, {
      locations: ["body"],
    });

    try {
      await Category.update(
        {
          name,
          description,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      await Log.create({
        createdBy: req.user.id,
        categoryId: req.params.id,
        description: `Category ID#${req.params.id} has been updated to "${name}" with description of "${description}".`
      })

      res.send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/all",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const categories = await Category.findAll({
        include: [Image, Product],
      });

      res.send({ categories });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,
  async (req, res) => {
    const category = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Image, {
        model: Product,
        include: [{
          model: Variant,
          include: [Image]
        }]
      }]
    });

    if (!category) {
      return res.status(404).send("Category not found!");
    }

    return res.send(category);
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
      await Employee.destroy({
        where: {
          id: req.params.id,
        },
      });

      await Log.create({
        createdBy: req.user.id,
        description: `Category ID#${req.params.id} has been deleted.`
      })

      res.send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,
  async (req, res) => {
    const employee = await Employee.findOne({
      where: {
        id: req.params.id,
      },
      include: Image,
    });

    if (!employee) {
      return res.status(404).send("Employee not found!");
    }

    return res.send(employee);
  }
);

router.post(
  "/changeImage/:id",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(422).send("Image not found");
    }
    const newImage = await Image.create({
      location: "/" + req.file.path,
      createdBy: req.user.id,
    });

    Category.update(
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
      categoryId: req.params.id,
      description: `Category ID#${req.params.id}'s image has been changed.`
    })

    res.send();
  }
);

module.exports = router;
