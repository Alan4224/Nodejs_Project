const express = require("express");
const path = require('path');
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
require("dotenv").config();
const database = require("./config/database.js");
const systemConfig = require("./config/system.js");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

database.connect();

const app = express();

const port = process.env.PORT;

//flash
app.use(cookieParser("HHFHHFHFHHFHFH"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//end flash

//TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//End TinyMCE
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

app.locals.prefixAdmin = systemConfig.prefixAdmin;

route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
