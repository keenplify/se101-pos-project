const { validationResult } = require("express-validator");

module.exports = {
  randomString(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  validateResultMiddleware(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },

  AdminOnly(req, res, next) {
    if (req.user.type === "ADMIN") return next();
    return res.status(401).send("This route is only available to admins.");
  },
  
  company: {
    name: "V4perous M4ster",
    logo: "https://i.ibb.co/VNr0q93/logo1.png",
    address: ["Address Line 1", "Address Line 2"],
    contact: {
      name: "Tupe",
      position: "CEO",
      tel: "09123456789",
      email: "tupe@gmail.com"
    }
  }
};
