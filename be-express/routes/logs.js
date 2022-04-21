const router = require("express").Router();
const Log = require("../models/log");
const { body, matchedData } = require("express-validator");
const {
    validateResultMiddleware,
    AdminOnly,
} = require("../libraries/helpers");
const passport = require("passport");


router.post(
    "/add",
    passport.authenticate("bearer", { session: false }),
    AdminOnly,
    [
      body("description").notEmpty().isString(),
    ],
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
    body("limit").notEmpty().isNumeric(),
    body("lastId").notEmpty().isNumeric(),
    validateResultMiddleware,
    async (req, res) => {
      const { limit, lastId } = matchedData(req, {
        locations: ["body"],
      });
      const cursor = lastId || 0;
      try {
        const logs = await Log.findAll({
          limit: limit,
          where: {
            id: {
              [Op.gt]: cursor,
            },
          },
        });
        res.send({
          logs,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  );


module.exports = router;