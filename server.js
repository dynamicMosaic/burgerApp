// npm packages
var express = require('express')
var bodyparser = require('body-parser')
var path = require('path')

// new express app
var app = express()

// DB
var db = require("./models");

// middleware

app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));


// your code here...

require("./routes/post-api-routes.js")(app);
require("./routes/author-api-routes.js")(app);
require("./routes/html-routes.js")(app);




db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});