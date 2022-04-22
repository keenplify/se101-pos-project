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
    [
      body("remarks").notEmpty().isString(),
      body("total_price").notEmpty().isString(),
      body("state").notEmpty().isString(),
      body("type")
        .notEmpty()
        .custom((i) => i === "CASH" || i === "EWALLET")
        .isString(),
    ],
    validateResultMiddleware,

    async (req, res) => {
      const { remarks, total_price, state, type } = matchedData(req, {
        locations: ["body"],
      });
      try {
        const newTransaction = await Transaction.create({
          remarks,
          total_price,
          state,
          type,
        });
  
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
        await Transaction.update(
          {
            where: {
              state: req.params.processing,paid, cancelled,
            },
          }
        );
  
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
        const transactions = await Transaction.findAll({
        });
  
        res.send({ transactions });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  );
  
  module.exports = router;