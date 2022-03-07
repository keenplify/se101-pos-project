const router = require("express").Router();
const Employee = require("../models/employee");
const { body, matchedData } = require("express-validator");
const { compareSync, hash, hashSync } = require("bcrypt");
const { Token } = require("../models");
const {
  randomString,
  validateResultMiddleware,
} = require("../libraries/helpers");
const passport = require("passport");

router.get(
  "/me",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    return res.send(req.user);
  }
);

router.post(
  "/login",
  [
    body("id").notEmpty().bail().isNumeric(),
    body("password").notEmpty().bail().isString(),
  ],
  validateResultMiddleware,
  async (req, res) => {
    const { id, password } = matchedData(req, {
      locations: ["body"],
    });

    try {
      const employee = await Employee.findOne({
        where: {
          id,
        },
      });

      if (!employee)
        return res.status(404).json({ errors: ["Employee does not exist."] });

      if (!compareSync(password, employee.password)) {
        return res.status(401).json({
          errors: ["Password is incorrect."],
        });
      }

      const token = await Token.create({
        hash: randomString(60),
        employeeId: employee.id,
      });
      return res.json({
        employee,
        token: token.hash,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/add",
  passport.authenticate("bearer", { session: false }),
  [
    body("firstName").notEmpty().bail().isString(),
    body("lastName").notEmpty().bail().isString(),
    body("password").notEmpty().bail().isString(),
    body("type")
      .notEmpty()
      .bail()
      .custom((i) => i === "Admin" || i === "Cashier")
      .bail()
      .isString(),
  ],
  validateResultMiddleware,

  async (req, res) => {
    const { firstName, lastName, password, type } = matchedData(req, {
      locations: ["body"],
    });

    try {
      const newEmployee = await Employee.create({
        firstName,
        lastName,
        password: hashSync(password, 10),
        employeeId: req.user.dataValues.id,
        type,
      });

      res.send(newEmployee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
