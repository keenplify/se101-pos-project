const router = require("express").Router();
const { body, matchedData, param } = require("express-validator");
const { compareSync, hash, hashSync } = require("bcrypt");
const { Token, Image, Employee, Log } = require("../models");
const { QueryTypes } = require("sequelize");
const {
  randomString,
  validateResultMiddleware,
  AdminOnly,
} = require("../libraries/helpers");
const sequelize = require("../libraries/sequelize");
const passport = require("passport");
const upload = require("../libraries/multer");
const { Op } = require("sequelize");

router.get(
  "/me",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    return res.send(req.user);
  }
);

router.get("/all", async (req, res) => {
  try {
    const employees = await sequelize.query(
      `SELECT * FROM employees LEFT JOIN (SELECT id as "image_id", location AS "image_location" FROM images)images ON "employees"."imageId" = "images"."image_id"`,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.send({ employees });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

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

      await Log.create({
        createdBy: id,
        description: `Employee "${employee.firstName} ${employee.lastName}" has logged in.`,
      });

      const token = await Token.create({
        hash: randomString(60),
        createdBy: employee.id,
      });
      return res.json({
        employee,
        token: token.hash,
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
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
      // Check if same employee exists as sir said, bawal same firstname at lastname
      const employees = await Employee.findOne({
        where: {
          [Op.and]: [
            {
              firstName: sequelize.where(
                sequelize.fn("LOWER", sequelize.col("firstName")),
                "LIKE",
                "%" + firstName.toLowerCase() + "%"
              ),
            },
            {
              lastName: sequelize.where(
                sequelize.fn("LOWER", sequelize.col("lastName")),
                "LIKE",
                "%" + lastName.toLowerCase() + "%"
              ),
            },
          ],
        },
      });

      if (employees !== null)
        return res
          .status(500)
          .send({ error: "First name or last name must be unique!" });

      const newEmployee = await Employee.create({
        firstName,
        lastName,
        password: hashSync(password, 10),
        createdBy: req.user.id,
        type,
      });

      await Log.create({
        createdBy: req.user.id,
        description: `New employee named "${firstName} ${lastName}" has been added.`,
      });

      res.send(newEmployee);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.put(
  "/me/changeName",
  passport.authenticate("bearer", { session: false }),
  [
    body("firstName").notEmpty().isString(),
    body("lastName").notEmpty().isString(),
  ],
  validateResultMiddleware,

  async (req, res) => {
    const { firstName, lastName } = matchedData(req, {
      locations: ["body"],
    });

    try {
      // Check if same employee exists as sir said, bawal same firstname at lastname
      const employees = await Employee.findOne({
        where: {
          [Op.and]: [
            {
              firstName: sequelize.where(
                sequelize.fn("LOWER", sequelize.col("firstName")),
                "LIKE",
                "%" + firstName.toLowerCase() + "%"
              ),
            },
            {
              lastName: sequelize.where(
                sequelize.fn("LOWER", sequelize.col("lastName")),
                "LIKE",
                "%" + lastName.toLowerCase() + "%"
              ),
            },
          ],
          id: {
            [Op.not]: req.user.id,
          },
        },
      });

      if (employees !== null)
        return res
          .status(500)
          .send({ error: "First name or last name must be unique!" });

      await Employee.update(
        {
          firstName,
          lastName,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );

      await Log.create({
        createdBy: req.user.id,
        description: `Employee ID#${req.params.id} has updated his/her own name into "${firstName} ${lastName}".`,
      });

      res.send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/me/changePassword",
  passport.authenticate("bearer", { session: false }),
  [body("password").notEmpty().isString()],
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
            id: req.user.id,
          },
        }
      );

      await Log.create({
        createdBy: req.user.id,
        description: `Employee ID#${req.user.id}'s password has been changed.`,
      });

      res.send();
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

      await Log.create({
        createdBy: req.user.id,
        description: `Employee ID#${req.params.id} has been deleted.`,
      });

      res.send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/me/changeImage",
  passport.authenticate("bearer", { session: false }),
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      return res.status(422).send("Image not found");
    }
    const newImage = await Image.create({
      location: "/" + req.file.path,
      createdBy: req.user.id,
    });

    await Employee.update(
      {
        imageId: newImage.id,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    await Log.create({
      createdBy: req.user.id,
      description: `Employee ID#${req.user.id}'s self image has been changed.`,
    });

    res.send();
  }
);

router.post(
  "/changeImage/:id",
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
      location: "/" + req.file.path,
      createdBy: req.user.id,
    });

    await Employee.update(
      {
        imageId: newImage.id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    await Log.create({
      createdBy: req.user.id,
      description: `Employee ID#${req.params.id}'s image has been changed.`,
    });

    res.send();
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

module.exports = router;
