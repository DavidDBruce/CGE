// P2-10 Jordan Nazario && Hunter Turley

var express = require('express');
var api = express.Router();


api.get("/", function (req,res) {
  console.log("Handling GET " + req);
  res.render("potentialCustomers/index.ejs");
});



module.exports = api;
