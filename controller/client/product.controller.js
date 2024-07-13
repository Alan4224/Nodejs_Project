const Product = require("../../models/product.model");
//[GET] /product
module.exports.index = async(req, res) => {
    const product = await Product.find({
        status:"active",
        deleted:false
    }).sort({position: "desc"});

    const newProduct = product.map(item => {
        item.priceNew=(item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item;
    });
    // console.log(product);

    res.render('clients/page/product/index',{
        pageTitle: "Trang danh sách sản phẩm",
        product: newProduct
    });
}
//[GET] /product/detail/slug
module.exports.detail = async(req, res) => {
    console.log(req.params.slug)
    try {
        const slug= req.params.slug;
        const find = {
          deleted: false,
          slug: slug,
          status: "active"
        };
        const product = await Product.findOne(find);
        console.log(product);
        res.render("clients/page/product/detail", {
          pageTitle: product.title,
          product: product,
        });
      } catch (error) {
        res.redirect(`/product`);
      }
}