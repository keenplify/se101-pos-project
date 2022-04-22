const router = require("express").Router();
const { body, matchedData, param } = require("express-validator");
const { Token, Image, Employee } = require("../models");
const {
  randomString,
  validateResultMiddleware,
  AdminOnly,
} = require("../libraries/helpers");
const passport = require("passport");
const upload = require("../libraries/multer");