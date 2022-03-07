const router = require("express").Router();
const Product = require("../models/product");
const { body } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();

    return res.send(products);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
