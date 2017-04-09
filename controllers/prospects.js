// P2-10 Jordan Nazario && Hunter Turley

var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
var Model = require('../models/prospect.js');
const notfoundstring = 'No prospects';


api.get("/", function (req,res) {
  console.log("Handling GET " + req);
  res.render("potentialCustomers/index.ejs");
});



module.exports = api;
