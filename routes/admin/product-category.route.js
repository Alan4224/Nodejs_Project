const express = require("express");
const multer = require("multer");
const controller = require("../../controller/admin/product-category.controller");

const upload = multer();

const validate = require("../../validate/admin/product-category.validate");

const uploadCloud = require("../../middleware/admin/uploadCloud.middleware");

const route = express.Router();
route.get("/", controller.product);
route.get("/create", controller.create);
route.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

module.exports = route;
