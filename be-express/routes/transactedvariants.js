const router = require("express").Router();
const { body, matchedData, param } = require("express-validator");
const { compareSync, hash, hashSync } = require("bcrypt");
const {
  randomString,
  validateResultMiddleware,
} = require("../libraries/helpers");
const passport = require("passport");
const upload = require("../libraries/multer");
const { TransactedVariant, Variant, Image } = require("../models");
const sequelize = require("../libraries/sequelize");

router.post(
  "/add",
  passport.authenticate("bearer", { session: false }),
  [
    body("variantId").notEmpty().isNumeric(),
    body("quantity").notEmpty().isNumeric(),
    body("transactionId").notEmpty().isNumeric(),
  ],
  validateResultMiddleware,

  async (req, res) => {
    const { variantId, quantity, transactionId } = matchedData(req, {
      locations: ["body"],
    });
    try {
      // Include doenst work :(
      const sequelizeTransaction = await sequelize.transaction();
      let newTransactedVariant;
      try {
        let variant = await Variant.findByPk(variantId);

        if (variant.stock <= 0) {
          throw "Not enough stock!";
        }
        let newTV = await TransactedVariant.create({
          variantId,
          quantity,
          transactionId,
          createdBy: req.user.id,
        });
        newTransactedVariant = await TransactedVariant.findByPk(newTV.id, {
          include: [Variant],
        });
        sequelizeTransaction.commit();
      } catch (error) {
        sequelizeTransaction.rollback();
        console.error(error);
      }

      res.send({ newTransactedVariant });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);
router.delete(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,
  async (req, res) => {
    try {
      await TransactedVariant.destroy({
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
router.post(
  "/editquantity/:id",
  passport.authenticate("bearer", { session: false }),
  [body("quantity").notEmpty().isNumeric()],
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,

  async (req, res) => {
    const { quantity } = matchedData(req, {
      locations: ["body"],
    });
    try {
      const transactedvariant = await TransactedVariant.findByPk(
        req.params.id,
        {
          include: [Variant],
        }
      );

      console.log(quantity <= transactedvariant.variant.stock)
      if (!(quantity <= transactedvariant.variant.stock)) {
        throw "Not enough stocks!";
      }

      await TransactedVariant.update(
        {
          quantity,
        },
        {
          where: {
            id: Number.parseInt(req.params.id),
          },
        }
      );

      res.send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

// GET TRANSACTIONS WITH ID
router.get(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,
  async (req, res) => {
    const transactedVariant = await TransactedVariant.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!transactedVariant) {
      return res.status(404).send("Transacted variant does not exist!");
    }

    return res.send({ transactedVariant });
  }
);

module.exports = router;
