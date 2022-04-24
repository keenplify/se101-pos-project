const router = require("express").Router();
const { body, matchedData, param } = require("express-validator");
const { compareSync, hash, hashSync } = require("bcrypt");
const Transaction = require("../models/transaction");
const {
  randomString,
  validateResultMiddleware,
} = require("../libraries/helpers");
const passport = require("passport");
const upload = require("../libraries/multer");

router.post(
  "/add",
  passport.authenticate("bearer", { session: false }),
  validateResultMiddleware,

  async (req, res) => {
    try {
      const newTransaction = await Transaction.create();

      res.send(newTransaction);
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

router.put(
  "/finalizeTransaction",
  passport.authenticate("bearer", { session: false }),
  [
    body("type").notEmpty().isString(),
    body("phone_number").notEmpty().isInt(),
    body("account_name")
      .notEmpty()
      .custom((i) => i === "GCASH" || i === "PAYMAYA")
      .isString(),
  ],
  param("state").notEmpty().isNumeric(),
  validateResultMiddleware,

  async (req, res) => {
    const { type, phone_number, account_name } = matchedData(req, {
      locations: ["body"],
    });

    try {
      await Transaction.update(
        {
          type,
          phone_number,
          account_name,
        },
        {
          where: {
            state: req.params.state,
          },
        }
      );

      res.send();
    } catch (error) {
      res.status(500).json({ error: error.message });
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
    const product = await Transaction.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      return res.status(404).send("Transaction does not exist!");
    }

    return res.send(product);
  }
);

module.exports = router;
