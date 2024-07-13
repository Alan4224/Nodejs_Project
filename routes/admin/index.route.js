const dashboard = require('./dashboard.route');
const systemConfig = require("../../config/system");
const product = require('./product.route');
const productCategory = require('./product-category.route');

module.exports = (app) => {
    const PATH_ADMIN= systemConfig.prefixAdmin;
    
    app.use(PATH_ADMIN + '/dashboard', dashboard);
    app.use(PATH_ADMIN + '/product', product);
    app.use(PATH_ADMIN + '/product-category', productCategory);
}