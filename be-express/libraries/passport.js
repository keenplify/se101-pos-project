const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const { QueryTypes } = require('sequelize');

const { Token, Employee, Image } = require("../models");
const sequelize = require("./sequelize");


const Strategy = passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const exists = await Token.findOne({
        where: {
          hash: token,
        },
        include: {
          model: Employee,
          include: [Image],
        },
      });


      if (!exists) {
        return done(null, false);
      }
      const [employee] = await sequelize.query(`SELECT * FROM employees LEFT JOIN (SELECT id as "image_id", location AS "image_location" FROM images)images ON "employees"."imageId" = "images"."image_id" WHERE id=${exists.employee.id}`, {
        type: QueryTypes.SELECT
      })
      
      return done(null, employee);
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = Strategy;
