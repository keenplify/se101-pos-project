const router = require("express").Router();
const { body, matchedData, param } = require("express-validator");
const { compareSync, hash, hashSync } = require("bcrypt");
const transactedvariants = require("../models/transactedvariants");
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
      body("variantid").notEmpty().isString(),
      body("quantity").notEmpty().isString(),
    ],
    validateResultMiddleware,

    async (req, res) => {
      const { variantid, quantity } = matchedData(req, {
        locations: ["body"],
      });
      try {
        const newtransactedvariants = await transactedvariants.create({
          variantid,
          quantity,
        });
  
        res.send(newtransactedvariants);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    }
  );
  router.delete(
    "/",
    passport.authenticate("bearer", { session: false }),
    [
      body("quantity").notEmpty().isString(),
    ],
    param("id").notEmpty().isNumeric(),
    validateResultMiddleware,
    async (req, res) => {
      try {
        await transactedvariants.destroy({
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
    "/editquantity",
    passport.authenticate("bearer", { session: false }),
    [
      body("quantity").notEmpty().isString(),
    ],
    param("id").notEmpty().isNumeric(),
      validateResultMiddleware,
  
    async (req, res) => {
      const { quantity } = matchedData(req, {
        locations: ["body"],
      });
      try {
        const newtransactedvariants = await transactedvariants.create({
          quantity
        });
  
        res.send(newtransactedvariants);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    }
  );

  module.exports = router;