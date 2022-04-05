const router = require("express").Router();
const { body, matchedData, param } = require("express-validator");
const { compareSync, hash, hashSync } = require("bcrypt");
const { Token, Image, Employee } = require("../models");
const {
  randomString,
  validateResultMiddleware,
  AdminOnly,
} = require("../libraries/helpers");
const passport = require("passport");
const upload = require("../libraries/multer");

router.get(
  "/me",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    return res.send(req.user);
  }
);

router.get(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,
  async (req, res) => {
    const employee = await Employee.findOne({
      where: {
        id: req.params.id,
      },
      include: Image,
    });

    if (!employee) {
      return res.status(404).send("Employee not found!");
    }

    return res.send(employee);
  }
);

router.post(
  "/login",
  [body("id").notEmpty().isNumeric(), body("password").notEmpty().isString()],
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
        include: Image,
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
        createdBy: employee.id,
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
  AdminOnly,
  [
    body("firstName").notEmpty().isString(),
    body("lastName").notEmpty().isString(),
    body("password").notEmpty().isString(),
    body("type")
      .notEmpty()
      .custom((i) => i === "ADMIN" || i === "CASHIER")
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

router.put(
  "/:id",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  [
    body("firstName").notEmpty().isString(),
    body("lastName").notEmpty().isString(),
    body("type")
      .notEmpty()
      .custom((i) => i === "ADMIN" || i === "CASHIER")
      .isString(),
  ],
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,

  async (req, res) => {
    const { firstName, lastName, type } = matchedData(req, {
      locations: ["body"],
    });

    try {
      await Employee.update(
        {
          firstName,
          lastName,
          type,
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

router.post(
  "/:id/changePassword",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  [body("password").notEmpty().isString()],
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,

  async (req, res) => {
    const { password } = matchedData(req, {
      locations: ["body"],
    });

    try {
      await Employee.update(
        {
          password: hashSync(password, 10),
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

router.get(
  "/all",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      const employees = await Employee.findAll({
        include: Image,
      });

      res.send({ employees });
    } catch (error) {
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
      await Employee.destroy({
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
  "/:id/changeImage/",
  passport.authenticate("bearer", { session: false }),
  AdminOnly,
  param("id").notEmpty().isNumeric(),
  validateResultMiddleware,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(422).send("Image not found");
    }
    const newImage = await Image.create({
      location: req.file.path,
    });

    Employee.update(
      {
        imageId: newImage.id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.send();
  }
);

module.exports = router;
