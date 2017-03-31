//P3-3
//Unnathi VallapuReddy,Devin Miller
var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
var express = require('express');
var api = express.Router();
var Model = require('../models/roofingEstimate.js');  
const notfoundstring ='estimates';
var isDeleted;

// see app.js for the root request this controller handles

// GET to this controller root URI
api.get("/", function (request, response) {
  response.render("roofingEstimate/index.ejs");
});

api.get('/findall', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var data = req.app.locals.roofingEstimates.query;
    res.send(JSON.stringify(data));
});

api.get('/findone/:id', function(req, res){
     res.setHeader('Content-Type', 'application/json');
    var id = parseInt(req.params.id);
    var data = req.app.locals.roofingEstimates.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    res.send(JSON.stringify(item));
});


// GET create
api.get("/create",ensureAuthenticated.ensureLoggedIn, function(req, res) {
    console.log('Handling GET /create' + req);
    res.render("roofingEstimate/create",
        { title: "WP Primers", layout: "layout.ejs" });
});

// GET /delete/:id
api.get('/delete/:id', function(req, res) {
    console.log("Handling GET /delete/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.estimates.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('roofingEstimate/delete.ejs',
        {
            title: "Estimates",
            layout: "layout.ejs",
            estimate: item
        });
});

// GET /details/:id
api.get('/details/:id', function(req, res) {
    console.log("Handling GET /details/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.estimates.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('roofingEstimate/details.ejs',
        {
            title: "Estimates",
            layout: "layout.ejs",
            estimate: item
        });
});


// GET one
api.get('/edit/:id', function(req, res) {
    console.log("Handling GET /edit/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.roofingEstimates.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('roofingEstimate/edit.ejs',
        {
            title: "Estimates",
            layout: "layout.ejs",
            estimate: item
        });
});

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', function(req, res) {
    console.log("Handling POST " + req);
    var data = req.app.locals.roofingEstimates.query;
    var item = new Model;
    console.log("NEW ID " + req.body._id);
    item._id = parseInt(req.body._id);
    item.client = req.body.client;
    item.address = req.body.address;
    item.city = req.body.city;
    item.state = req.body.state;
    item.zipcode = req.body.zipcode;
    data.push(item);
    console.log("SAVING NEW ITEM " + JSON.stringify(item));
    return res.redirect('/roofingEstimate');
});

// POST update
api.post('/save/:id', function(req, res) {
    console.log("Handling SAVE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling SAVING ID=" + id);
    var data = req.app.locals.estimates.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("ORIGINAL VALUES " + JSON.stringify(item));
    console.log("UPDATED VALUES: " + JSON.stringify(req.body));
    item.client = req.body.client;
    item.address = req.body.address;
    item.city = req.body.city;
    item.state = req.body.state;
    item.zipcode = req.body.zipcode;
    console.log("SAVING UPDATED ITEM " + JSON.stringify(item));
    return res.redirect('/roofingEstimate');
});

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', function(req, res, next) {
    console.log("Handling DELETE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling REMOVING ID=" + id);
    var data = req.app.locals.roofingEstimates.query;
    var item = remove(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("Deleted item " + JSON.stringify(item));
    return res.redirect('/roofingEstimate');
});

module.exports = api;
/* 10 controller methods handled by controller:

controllers/roofingEstimate.js

2 Respond with JSON:

http://127.0.0.1:8082/roofingEstimate/findall [WORKING]
http://127.0.0.1:8082/roofingEstimate/findone/1 [WORKING]

5 Respond with CRUD Views:

http://127.0.0.1:8082/roofingEstimate [WORKING]
http://127.0.0.1:8082/roofingEstimate/create [WORKING]
http://127.0.0.1:8082/roofingEstimate/delete/1 [WORKING]
http://127.0.0.1:8082/roofingEstimate/details/1 [WORKING]
http://127.0.0.1:8082/roofingEstimate/edit/1 [WORKING]

3 Respond by executing CRUD actions:

http://127.0.0.1:8082/roofingEstimate/save [WORKING]
http://127.0.0.1:8082/roofingEstimate/save/1 [WORKING]
http://127.0.0.1:8082/roofingEstimate/delete/1 [WORKING]
*/