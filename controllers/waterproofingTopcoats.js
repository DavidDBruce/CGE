//P4-11 Darshan Yadav Venkatesh,Avinash vasadi.

var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
var Model = require('../models/waterproofingTopcoat.js');
const notfoundstring = 'No such waterproofing topcoat';

// See app.js to find default view folder (e.g.,"views")
// see app.js to find  default URI for this controller (e.g., "waterproofingTopcoat")
// Specify the handler for each required combination of URI and HTTP verb 
// HTML5 forms can only have GET and POST methods (use POST for DEvarE)

// HANDLE JSON REQUESTS --------------------------------------------

api.get('/findall', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var data = req.app.locals.waterproofingTopcoats.query;
    res.send(JSON.stringify(data));
});

api.get('/findone/:id', function(req, res){
     res.setHeader('Content-Type', 'application/json');
    var id = parseInt(req.params.id);
    var data = req.app.locals.waterproofingTopcoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    res.send(JSON.stringify(item));
});

// HANDLE VIEW DISPLAY REQUESTS --------------------------------------------

// GET all
api.get('/', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('waterproofing_topcoats/index.ejs',
        { title: "WP Topcoat", layout: "layout.ejs" });
});

// GET create
api.get("/create", function(req, res) {
    console.log('Handling GET /create' + req);
    res.render("waterproofing_topcoats/create.ejs",
        { title: "WP Topcoat", layout: "layout.ejs" });
});

// GET /devare/:id
api.get('/devare/:id', function(req, res) {
    console.log("Handling GET /devare/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.waterproofingTopcoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('waterproofing_topcoats/devare.ejs',
        {
            title: "WP Topcoat",
            layout: "layout.ejs",
            waterproofingTopcoat: item
        });
});

//Delete Get
api.get('/delete/:id', function (req, res) {
    console.log("Handling GET /delete/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.waterproofingTopcoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('waterproofing_topcoats/delete.ejs',
        {
            title: "WP Topcoat",
            layout: "layout.ejs",
            waterproofingTopcoat :item  
        });     
});

// GET /details/:id
api.get('/details/:id', function(req, res) {
    console.log("Handling GET /details/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.waterproofingTopcoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('waterproofing_topcoats/details.ejs',
        {
            title: "WP Topcoat",
            layout: "layout.ejs",
            waterproofingTopcoat: item
        });
});

// GET one
api.get('/edit/:id', function(req, res) {
    console.log("Handling GET /edit/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.waterproofingTopcoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('waterproofing_topcoats/edit.ejs',
        {
            title: "WP Topcoat",
            layout: "layout.ejs",
           waterproofingTopcoat: item
        });
});

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', function(req, res) {
    console.log("Handling POST " + req);
    var data = req.app.locals.waterproofingTopcoats.query;
    var item = new Model;
    console.log("NEW ID " + req.body._id);
    item._id = parseInt(req.body._id);
    item.name = req.body.name;
    item.unit = req.body.unit;
    item.price = req.body.price;
    item.displayorder = parseInt(req.body.displayorder);
    data.push(item);
    console.log("SAVING NEW ITEM " + JSON.stringify(item));
    return res.redirect('/waterproofingTopcoat');
});

// POST update
api.post('/save/:id', function(req, res) {
    console.log("Handling SAVE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling SAVING ID=" + id);
    var data = req.app.locals.waterproofingTopcoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("ORIGINAL VALUES " + JSON.stringify(item));
    console.log("UPDATED VALUES: " + JSON.stringify(req.body));
    item.name = req.body.name;
    item.unit = req.body.unit;
    item.price = req.body.price;
    item.displayorder = req.body.displayorder;
    console.log("SAVING UPDATED ITEM " + JSON.stringify(item));
    return res.redirect('/waterproofingTopcoat');
});


// DEvarE id (uses HTML5 form method POST)
api.post('/devare/:id', function(req, res, next) {
    console.log("Handling DEvarE request" + req);
});
// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', function(req, res, next) {
    console.log("Handling DELETE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling REMOVING ID=" + id);
    var data = req.app.locals.waterproofingTopcoats.query;
    var item = remove(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("Devared item " + JSON.stringify(item));
    return res.redirect('/waterproofingTopcoat');
});


module.exports = api;

/* 10 controller methods handled by controller:

controllers/waterproofingTopcoats.js

2 Respond with JSON:

http://127.0.0.1:8082/waterproofingTopcoats/findall [WORKING]
http://127.0.0.1:8082/waterproofingTopcoats/findone/1 [WORKING]

5 Respond with CRUD Views:

http://127.0.0.1:8082/waterproofingTopcoats [WORKING]
http://127.0.0.1:8082/waterproofingTopcoats/create [NOTWORKING]
http://127.0.0.1:8082/waterproofingTopcoats/delete/1 [NOTWORKING]
http://127.0.0.1:8082/waterproofingTopcoats/details/1 [NOTWORKING]
http://127.0.0.1:8082/waterproofingTopcoats/edit/1 [NOTWORKING]

3 Respond by executing CRUD actions:

http://127.0.0.1:8082/waterproofingTopcoats/save [NOTWORKING]
http://127.0.0.1:8082/waterproofingTopcoats/save/1 [NOTWORKING]
http://127.0.0.1:8082/waterproofingTopcoats/delete/1 [NOTWORKING]
*/