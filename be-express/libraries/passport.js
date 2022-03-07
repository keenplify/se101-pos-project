const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;

const { Token, Employee } = require("../models");

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const exists = await Token.findOne({
        where: {
          hash: token,
        },
        include: Employee,
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

module.exports = passport;
