const router = require("express").Router();
const { body, matchedData, param, query } = require("express-validator");
const { compareSync, hash, hashSync } = require("bcrypt");
const Transaction = require("../models/transaction");
const {
  randomString,
  validateResultMiddleware,
  AdminOnly,
} = require("../libraries/helpers");
const passport = require("passport");
const upload = require("../libraries/multer");
const {
  TransactedVariant,
  EWallet,
  Variant,
  Product,
  Log,
} = require("../models");
const { Sequelize, Op } = require("sequelize");
const sequelize = require("../libraries/sequelize");
const Revoice = require("revoice");
const helpers = require("../libraries/helpers");
const path = require("path");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

      await Log.create({
        createdBy: req.user.id,
        transactionId: newTransaction.id,
        description: `A new transaction has been added.`,
      });

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
    body("remarks").isString(),
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

    // Set quantity of variant to one lower and calculate total price
    // make sequelize transaction so the cost of update stocks is lower
    let total_price = 0;
    const sqlTransaction = await sequelize.transaction();

    try {
      for (let i = 0; i < transactedVariants.length; i++) {
        const tv = transactedVariants[i];
        total_price += tv.variant.price * tv.quantity;
        console.log(total_price);

        await Variant.update(
          {
            stock: Sequelize.literal("stock - " + tv.quantity),
          },
          {
            where: {
              id: tv.variant.id,
            },
          }
        );
      }

      await sqlTransaction.commit();
    } catch (error) {
      await sqlTransaction.rollback();
      console.log(error);
    }

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

      await Log.create({
        createdBy: req.user.id,
        transactionId: req.params.id,
        description: `Transaction ID#${req.params.id} was finalized.`,
      });

      res.send();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error!" });
    }
  }
);

router.get(
  "/generateReceipt/:id",
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const transaction = await Transaction.findByPk(req.params.id, {
        include: [
          {
            model: TransactedVariant,
            include: [
              {
                model: Variant,
                include: [Product],
              },
            ],
          },
          EWallet,
        ],
      });

      const items = transaction.transactedvariants.map((tv) => {
        return {
          id: tv.variant.id.toString(),
          title: `${tv.variant.product.name} - ${tv.variant.name}`,
          date: tv.variant.createdAt.toISOString().slice(0, 10),
          amount: tv.variant.price,
          tax: 0,
          quantity: tv.quantity,
          total: tv.variant.price * tv.quantity,
        };
      });

      const destination = "/public/generated-receipts/";

      const invoicePath = await Revoice.default.generateHTMLInvoice(
        {
          id: transaction.id.toString(),
          date: transaction.updatedAt.toISOString().slice(0, 10),
          issuer: helpers.company,
          type: transaction.type,
          invoicee: {
            name:
              transaction.type == "EWALLET"
                ? transaction["e-wallet"].account_name +
                  " (" +
                  transaction["e-wallet"].phone_number +
                  ")"
                : "",
          },
          items,
          comments: transaction.remarks,
        },
        {
          template: "./public/receipt/index.html",
          destination: "." + destination,
          name: "receipt-" + new Date().getTime().toString(),
        }
      );
      const extension = path.extname(invoicePath);
      const invoiceFileName = path.basename(invoicePath, extension);

      const link =
        req.protocol +
        "://" +
        req.headers.host +
        destination +
        invoiceFileName +
        ".html";

      await Log.create({
        createdBy: req.user.id,
        transactionId: req.params.id,
        description: `Transaction ID#${req.params.id} receipt was generated. Link: "${link}"`,
      });

      res.send({ location: link });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/generateSalesData/weekly",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  query("startDate").notEmpty().isISO8601(),
  query("endDate").notEmpty().isISO8601(),
  validateResultMiddleware,
  async (req, res) => {
    const { startDate, endDate } = matchedData(req, {
      locations: ["query"],
    });

    let _startDate = new Date(startDate);
    let _endDate = new Date(endDate);

    try {
      const mainDataSource = await Transaction.findAll({
        where: {
          state: "PAID",
          createdAt: {
            [Op.and]: {
              [Op.gte]: _startDate,
              [Op.lte]: _endDate,
            },
          },
        },
        include: [{
          model: TransactedVariant,
          include: [{
            model: Variant,
            include: [Product]
          }]
        }]
      });

      // Calculate week Data Table
      let barData = [];
      let currentDate = _startDate;
      while (currentDate <= _endDate) {
        currentDate.setDate(currentDate.getDate() + 1); // glad js is smart about date rollovers,,,
        let sales = 0;

        mainDataSource.forEach((source) => {
          // Check if source is within the date
          const createdAt = new Date(source.createdAt);
          if (
            createdAt.getYear() == currentDate.getYear() &&
            createdAt.getMonth() == currentDate.getMonth() &&
            createdAt.getDay() == currentDate.getDay()
          ) {
            sales += source.total_price;
          }
        });

        barData.push({
          name: days[currentDate.getDay()],
          Sales: sales,
        });
      }

      let pieData = [];
      var totalSales = 0;

      mainDataSource.forEach(transaction => {
        totalSales += transaction.total_price;
        transaction.transactedvariants.forEach((source) => {
          var dataIndex = pieData.findIndex(
            (data) => data.transactedVariant.variant.id == source.variant.id
          );
          if (dataIndex >= 0) {
            pieData[dataIndex].value += source.quantity;
            pieData[dataIndex].total_price += source.variant.price;
          } else {
            pieData.push({
              transactedVariant: source,
              name: `${source.variant.product.name} ${source.variant.name}`,
              total_price: source.variant.price,
              value: source.quantity,
            });
          }
        });
      })


      res.send({ barData, pieData, totalSales });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/generateSalesData/monthly",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  query("startDate").notEmpty().isISO8601(),
  query("endDate").notEmpty().isISO8601(),
  validateResultMiddleware,
  async (req, res) => {
    const { startDate, endDate } = matchedData(req, {
      locations: ["query"],
    });

    let _startDate = new Date(startDate);
    let _endDate = new Date(endDate);

    try {
      const mainDataSource = await Transaction.findAll({
        where: {
          state: "PAID",
          createdAt: {
            [Op.and]: {
              [Op.gte]: _startDate,
              [Op.lte]: _endDate,
            },
          },
        },
        include: [{
          model: TransactedVariant,
          include: [{
            model: Variant,
            include: [Product]
          }]
        }]
      });

      // Calculate week Data Table
      let barData = [];
      let currentDate = _startDate;
      let tblindex=0;
      while (currentDate <= _endDate) {
        let sales = 0;
        console.log(currentDate.getDate());
        let lastDate = new Date(currentDate.toISOString())
        lastDate.setDate(lastDate.getDate() + 6);

        mainDataSource.forEach((source) => {
          // Check if source is within the date
          const createdAt = new Date(source.createdAt);
          if (
            createdAt.getYear() == currentDate.getYear() &&
            createdAt.getMonth() == currentDate.getMonth() &&
            createdAt <= lastDate &&
            createdAt >= currentDate
          ) {
            sales += source.total_price;
          }
        });

        currentDate.setDate(currentDate.getDate() + 7); // glad js is smart about date rollovers,,,
        tblindex++;
        barData.push({
          name: "Week " + tblindex,
          Sales: sales,
        });
      }

      let pieData = [];
      var totalSales = 0;

      mainDataSource.forEach(transaction => {
        totalSales += transaction.total_price;
        transaction.transactedvariants.forEach((source) => {
          var dataIndex = pieData.findIndex(
            (data) => data.transactedVariant.variant.id == source.variant.id
          );
          if (dataIndex >= 0) {
            pieData[dataIndex].value += source.quantity;
            pieData[dataIndex].total_price += source.variant.price;
          } else {
            pieData.push({
              transactedVariant: source,
              name: `${source.variant.product.name} ${source.variant.name}`,
              total_price: source.variant.price,
              value: source.quantity,
            });
          }
        });
      })


      res.send({ barData, pieData, totalSales });
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
