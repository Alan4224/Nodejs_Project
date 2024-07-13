const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system.js");

//[GET] /admin/product-category
module.exports.product = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await ProductCategory.find(find)
  res.render("admin/page/product-category/index", {
    pageTitle: "Trang danh mục sản phẩm",
    records: records,
  });
};
//[GET] /admin/product-category/create
module.exports.create = (req, res) => {
  res.render("admin/page/product-category/create", {
    pageTitle: "Trang tạo mới danh mục",
  });
};
//[POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  }  

  const record = new ProductCategory(req.body);
  await record.save();

  res.redirect(`${systemConfig.prefixAdmin}/product-category`);
  
};