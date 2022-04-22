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
  router.delete(
    "/:id",
    passport.authenticate("bearer", { session: false }),
    AdminOnly,
    param("id").notEmpty().isNumeric(),
    validateResultMiddleware,
    async (req, res) => {
      try {
        await Variant.destroy({
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
  router.put(
    "/:id",
    passport.authenticate("bearer", { session: false }),
    AdminOnly,
    [
      body("productId").notEmpty().isNumeric(),
      body("name").notEmpty().isString(),
      body("stock").notEmpty().isNumeric(),
    ],
    param("id").notEmpty().isNumeric(),
    validateResultMiddleware,
  
    async (req, res) => {
      const { productId, name, stock } = matchedData(req, {
        locations: ["body"],
      });
  
      try {
        await Employee.update(
          {
            productId,
            name,
            stock,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
  
        res.send();
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  );
  router.get("/all", async (req, res) => {
    try {
      const variants = await Variant.findAll({
        include: Image,
      });
  
      res.send({ variants });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.get("/allByProduct", async (req, res) => {
    try {
      const variants = await Variant.findAll({
        include: Image,
      });
  
      res.send({ variants });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.post(
    "/:id/changeImage",
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
  router.get("/allByProduct", async (req, res) => {
    try {
      const variants = await Variant.findAll({
        include: Image,
      });
  
      res.send({ variants });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.delete(
    "/:id",
    passport.authenticate("bearer", { session: false }),
    AdminOnly,
    param("id").notEmpty().isNumeric(),
    validateResultMiddleware,
    async (req, res) => {
      try {
        await Variant.destroy({
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
  module.exports=router