const router = require("express").Router();
const { body, matchedData, param } = require("express-validator");
const { compareSync, hash, hashSync } = require("bcrypt");
const Transaction = require("../models/transaction");
const {
  randomString,
  validateResultMiddleware,
  AdminOnly,
} = require("../libraries/helpers");
const passport = require("passport");
const upload = require("../libraries/multer");
const { TransactedVariant, EWallet, Variant } = require("../models");
const { Sequelize } = require("sequelize");

router.post(
  "/add",
  passport.authenticate("bearer", { session: false }),
  validateResultMiddleware,

  async (req, res) => {
    try {
      const newTransaction = await Transaction.create(
        {
          createdBy: req.user.id,
        },
        {
          include: [{ model: TransactedVariant, include: [Variant] }, EWallet],
        }
      );

      res.send({ newTransaction });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/changeState",
  passport.authenticate("bearer", { session: false }),

  validateResultMiddleware,

  async (req, res) => {
    const { state, id } = matchedData(req, {
      locations: ["body"],
    });

    try {
      await Transaction.update({
        where: {
          state: req.params.processing,
          paid,
          cancelled,
        },
      });

      res.send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/finalizeTransaction/:id",
  passport.authenticate("bearer", { session: false }),
  [
    body("type")
      .notEmpty()
      .custom((i) => i === "CASH" || i === "EWALLET")
      .isString(),
    body("phone_number").isString().optional(),
    body("account_name").isString().optional(),
    body("eWalletType")
      .custom((i) => i === "GCASH" || i === "PAYMAYA")
      .optional(),
    body("remarks").notEmpty().isString(),
  ],
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,

  async (req, res) => {
    const { type, phone_number, account_name, eWalletType, remarks } =
      matchedData(req, {
        locations: ["body"],
      });

    // Calculate total price
    let transactedVariants = await TransactedVariant.findAll({
      where: {
        transactionId: req.params.id,
      },
      include: [Variant],
    });

    let total_price = 0
    transactedVariants.forEach(
      (tv) => total_price += tv.variant.price * tv.quantity
    );

    // Set quantity of variant to one lower
    let variantUpdateIds = [];
    transactedVariants.forEach(tv => variantUpdateIds.push(tv.variant.id))
    await Variant.update(
      {
        stock: Sequelize.literal("stock - 1"),
      },
      {
        where: {
          id: variantUpdateIds,
        },
      }
    );

    let updateData = {
      type,
      remarks,
      total_price,
      state: "PAID",
    };

    // Create new ewallet for consume on finalized transaction

    if (type === "EWALLET") {
      let newEWallet = EWallet.create({
        type: eWalletType,
        phone_number,
        account_name,
      });
      updateData = {
        ...updateData,
        eWalletId: newEWallet.id,
      };
    }

    try {
      await Transaction.update(updateData, {
        where: {
          id: req.params.id,
        },
      });

      res.send();
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Error!" });
    }
  }
);

router.get(
  "/generateReceipt",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const transactions = await Transaction.findAll({
        include: receiptpdf,
      });

      res.send({ transactions });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/generateSalesData",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  param("startDate, endDate").notEmpty().isNumeric(),
  validateResultMiddleware,

  async (req, res) => {
    try {
      const transactions = await Transaction.findAll({});

      res.send({ transactions });
    } catch (error) {
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
    const transaction = await Transaction.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: TransactedVariant, include: [Variant] }, EWallet],
    });

    if (!transaction) {
      return res.status(404).send("Transaction does not exist!");
    }

    return res.send({ transaction });
  }
);

module.exports = router;
