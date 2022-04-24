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
    body("stock").notEmpty().isNumeric(),
  ],
  validateResultMiddleware,

  async (req, res) => {
    const { productId, name, stock } = matchedData(req, {
      locations: ["body"],
    });

    try {
      const newVariant = await Variant.create({
        productId,
        name,
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
