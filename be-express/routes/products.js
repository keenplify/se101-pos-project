const router = require("express").Router();
const Product = require("../models/product");
const { body, matchedData, param, query } = require("express-validator");
const passport = require("passport");
const { validateResultMiddleware, AdminOnly } = require("../libraries/helpers");
const { Image, Variant } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// PAGINATION
router.get(
  "/getPaginate",
  passport.authenticate("bearer", { session: false }),
  body("limit").notEmpty().isNumeric(),
  body("lastId").notEmpty().isNumeric(),
  validateResultMiddleware,
  async (req, res) => {
    const { limit, lastId } = matchedData(req, {
      locations: ["body"],
    });
    const cursor = lastId || 0;
    try {
      const products = await Product.findAll({
        limit: limit,
        where: {
          id: {
            [Op.gt]: cursor,
          },
        },
      });
      res.send({
        products,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//GET ALL
router.get(
  "/getAll",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const products = await Product.findAll();

      res.send({ products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// SEARCH BY KEYWORD
router.get(
  "/search",
  passport.authenticate("bearer", { session: false }),
  body("keyword").notEmpty().isString(),
  validateResultMiddleware,
  async (req, res) => {
    const { keyword } = matchedData(req, {
      locations: ["body"],
    });

    try {
      const products = await Product.findAll({
        where: { name: { [Op.like]: "%" + keyword + "%" } },

        include: [{ model: Variant }],
      });
      res.send({
        products,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET PRODUCT BY CATEGORY
router.get(
  "/getByCategoryPaginate",
  passport.authenticate("bearer", { session: false }),
  query("categoryId").notEmpty().isNumeric(),
  query("limit").notEmpty().isNumeric(),
  query("lastId").notEmpty().isNumeric(),
  validateResultMiddleware,
  async (req, res) => {
    const { limit, lastId, categoryId } = matchedData(req, {
      locations: ["query"],
    });
    const cursor = lastId || 0;
    try {
      const products = await Product.findAll({
        limit: limit,
        where: {
          id: {
            [Op.gt]: cursor,
          },
          categoryId,
        },
        include: [
          {
            model: Variant,
            include: Image,
          },
        ],
      });
      res.send({
        products,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// SEARCH BY ID
router.get(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,
  async (req, res) => {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      return res.status(404).send("Product does not exist!");
    }

    return res.send(product);
  }
);

// ADD PRODUCT
router.post(
  "/add",
  passport.authenticate("bearer", { session: false }),
  [
    body("categoryId").notEmpty().bail().isNumeric(),
    body("name").notEmpty().bail().isString(),
  ],
  validateResultMiddleware,

  async (req, res) => {
    const { categoryId, name } = matchedData(req, {
      locations: ["body"],
    });

    try {
      const newProduct = await Product.create({
        name,
        createdBy: req.user.dataValues.id,
        categoryId,
      });

      res.send(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//DELETE
router.delete(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,
  async (req, res) => {
    try {
      await Product.destroy({
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

//EDIT
router.put(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  [
    body("name").notEmpty().isString(),
  ],
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,

  async (req, res) => {
    const { name } = matchedData(req, {
      locations: ["body"],
    });

    try {
      await Product.update(
        {
          name,
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

module.exports = router;
