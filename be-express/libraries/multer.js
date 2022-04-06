const multer = require("multer");
const slugify = require("slugify");

const upload = multer({
  storage: multer.diskStorage({
    destination: "public/uploads/",
    filename: (req, file, cb) => {
      const name = slugify(file.originalname, { lower: true });
      cb(null, `${new Date().getTime()}-${name}`);
    },

    fileFilter: (req, file, cb) => {
      if (
        !["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
          file.mimetype
        )
      ) {
        return cb(new Error("file is not allowed"));
      }

      cb(null, true);
    },
  }),
});

module.exports = upload;
