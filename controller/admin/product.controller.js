const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
const systemConfig = require("../../config/system.js");
//[GET] /admin/product
module.exports.product = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }

  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  //end search
  // pagination
  const countProducts = await Product.countDocuments(find);

  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    req.query,
    countProducts
  );
  //Sort
  let sort ={};
  if(req.query.sortKey&&req.query.sortValue){
    sort[req.query.sortKey]=req.query.sortValue;
  }else{
    sort.position = "desc"
  }
  //End Sort
  const product = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.render("admin/page/product/index", {
    pageTitle: "Trang sản phẩm",
    product: product,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};
//[PATH]/admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái thành công !");
  res.redirect("back");
};
//[PATH]/admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash(
        "success",
        `Cập nhật trạng thái ${ids.length} sản phẩm thành công !`
      );
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "success",
        `Cập nhật trạng thái ${ids.length} sản phẩm thành công !`
      );
      break;
    case "delete":
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      break;
    default:
      break;
  }
  res.redirect("back");
};
//[DELETE]/admin/product/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );
  res.redirect("back");
};
//[GET] /admin/product/create
module.exports.create = (req, res) => {
  res.render("admin/page/product/create", {
    pageTitle: "Trang tạo mới sản phẩm",
  });
};
//[POST] /admin/product/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1;
  }

  

  const product = new Product(req.body);
  await product.save();

  res.redirect(`${systemConfig.prefixAdmin}/product`);
};
//[GET] /admin/product/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      deleted: false,
      _id: id,
    };
    const product = await Product.findOne(find);
    res.render("admin/page/product/edit", {
      pageTitle: "Trang chỉnh sửa sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/product`);
  }
};
//[PATCH] /admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  try {
    await Product.updateOne({ _id: id }, req.body);
    req.flash("success","Cập nhật thành công !");
  } catch (error) {
    req.flash("error","Cập nhật thất bại !");
  }
  res.redirect("back");
};
//[GET] /admin/product/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      deleted: false,
      _id: id,
    };
    const product = await Product.findOne(find);
    res.render("admin/page/product/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/product`);
  }
};