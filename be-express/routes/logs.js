const router = require("express").Router();
const Log = require("../models/log");
const { body, matchedData, query } = require("express-validator");
const { validateResultMiddleware, AdminOnly } = require("../libraries/helpers");
const passport = require("passport");
const { Employee } = require("../models");
const { Op } = require("sequelize");

router.post(
  "/add",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  [body("description").notEmpty().isString()],
  validateResultMiddleware,

  async (req, res) => {
    const description = matchedData(req, {
      locations: ["body"],
    });

    try {
      const newLog = await Log.create({
        description,
      });

      res.send(newLog);
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
      const logs = await Log.findAll({
        include: [Employee],
      });

      res.send({ logs });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/allPaginate",
  passport.authenticate("bearer", { session: false }),
  query("limit").notEmpty().isNumeric(),
  query("before").isString().optional(),
  query("after").isString().optional(),
  query("keyword").isString().optional(),
  validateResultMiddleware,
  async (req, res) => {
    const { limit, before, after, keyword } = matchedData(req, {
      locations: ["query"],
    });
    try {
      const logs = await Log.paginate({
        limit,
        include: [Employee],
        before,
        after,
        order: [["createdAt", "DESC"]],
        where: keyword ? {
          description: { [Op.like]: "%" + keyword + "%" }
        } : null
      });

      res.send({
        logs,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
