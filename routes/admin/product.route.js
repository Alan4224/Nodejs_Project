const express = require("express");
const multer = require("multer");

const validate = require("../../validate/admin/product.validate");

const uploadCloud = require("../../middleware/admin/uploadCloud.middleware");

const route = express.Router();

const upload = multer();
const controller = require("../../controller/admin/product.controller");

route.get("/", controller.product);

route.patch("/change-status/:status/:id", controller.changeStatus);

route.patch("/change-multi", controller.changeMulti);

route.delete("/delete/:id", controller.delete);

route.get("/create", controller.create);

route.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

route.get("/edit/:id", controller.edit);

route.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);

route.get("/detail/:id", controller.detail);

module.exports = route;
