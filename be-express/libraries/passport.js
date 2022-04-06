const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;

const { Token, Employee, Image } = require("../models");

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
      return done(null, exists.employee);
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = Strategy;
