const { hashSync } = require("bcrypt");
const { Image, Employee } = require("../models");

// Create genesis admin (Admin #1) after 2.5 seconds
setTimeout(async () => {
  if (process.env.CREATEGENESISADMIN !== "true") return;

  await Employee.findOrCreate({
    where: {
      id: 1,
    },
    defaults: {
      firstName: "Genesis",
      lastName: "Admin",
      password: hashSync("admin", 10),
      type: "ADMIN",
      createdBy: 1,
    },
  });

  await Image.findOrCreate({
    where: {
      id: 1,
    },
    defaults: {
      location: "\\public\\images\\genesisadmin.png",
      createdBy: 1,
    },
  });

  Employee.update({ imageId: 1 }, { where: { id: 1 } });

  console.log("Genesis admin sucessfully created.");
}, 2500);
