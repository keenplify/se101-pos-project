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
          stock
        });
  
        res.send(newVariant);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    }
  );