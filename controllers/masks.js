var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
var Model = require('../models/masks.js');
const notfoundstring = 'No such mask found';
var findIndex = require('lodash.findindex');

// see app.js for the root request this controller handles
// See app.js to find default view folder (e.g.,"views")
// see app.js to find  default URI for this controller (e.g., "mileageRate")
// Specify the handler for each required combination of URI and HTTP verb 
// HTML5 forms can only have GET and POST methods (use POST for DELETE)

// HANDLE JSON REQUESTS --------------------------------------------

api.get('/findall', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var data = req.app.locals.masks.query;
    res.send(JSON.stringify(data));
});

api.get('/findone/:id', function(req, res){
     res.setHeader('Content-Type', 'application/json');
    var id = parseInt(req.params.id);
    var data = req.app.locals.masks.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    res.send(JSON.stringify(item));
});

// HANDLE VIEW DISPLAY REQUESTS --------------------------------------------

// GET all
api.get('/', function(req, res) {
    console.log("Handling GET " + req);
    return res.render('mask/index.ejs',
        { title: "Masks", layout: "layout.ejs" });
});

// GET create
api.get("/create", function(req, res) {
    console.log('Handling GET /create' + req);
    res.render("mask/create.ejs",
        { title: "Masks", layout: "layout.ejs" });
});

// GET /delete/:id
api.get('/delete/:id', function(req, res) {
    console.log("Handling GET /delete/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.masks.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('mask/delete.ejs',
        {
            title: "Masks",
            layout: "layout.ejs",
            masks: item
        });
});

// GET /details/:id
api.get('/details/:id', function(req, res) {
    console.log("Handling GET /details/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.masks.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('mask/details.ejs',
        {
            title: "Masks",
            layout: "layout.ejs",
            masks: item
        });
});

// GET one
api.get('/edit/:id', function(req, res) {
    console.log("Handling GET /edit/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.masks.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('mask/edit.ejs',
        {
            title: "Masks",
            layout: "layout.ejs",
            masks: item
        });
});

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', function(req, res) {
    console.log("Handling POST " + req);
    var data = req.app.locals.masks.query;
    var item = new Model;
    console.log("NEW ID " + req.body._id);
    item._id = parseInt(req.body._id);
    item.name = req.body.name;
    item.type = req.body.type;
    item.displayorder = parseInt(req.body.displayorder);
    data.push(item);
    console.log("SAVING NEW ITEM " + JSON.stringify(item));
    return res.redirect('/mask');
});

// POST update
api.post('/save/:id', function(req, res) {
    console.log("Handling SAVE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling SAVING ID=" + id);
    var data = req.app.locals.masks.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("ORIGINAL VALUES " + JSON.stringify(item));
    console.log("UPDATED VALUES: " + JSON.stringify(req.body));
    item.name = req.body.name;
    item.type = req.body.type;
    item.displayorder = req.body.displayorder;
    console.log("SAVING UPDATED ITEM " + JSON.stringify(item));
    return res.redirect('/mask');
});

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', function(req, res, next) {
    console.log("Handling DELETE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling REMOVING ID=" + id);
    var data = req.app.locals.masks.query;
    var item = findIndex(data, { '_id': id });
    if (item == -1) { return res.end(notfoundstring); }
    data[item].isDeleted=true;
    console.log("Deleted item " + JSON.stringify(item));
    return res.redirect('/mask');
});


module.exports = api;

/* 10 controller methods handled by controller:

controllers/milageRate.js

2 Respond with JSON:

http://127.0.0.1:8082/milageRate/findall [WORKING]
http://127.0.0.1:8082/milageRate/findone/1 [WORKING]

5 Respond with CRUD Views:

http://127.0.0.1:8082/milageRate [WORKING]
http://127.0.0.1:8082/milageRate/create [WORKING]
http://127.0.0.1:8082/milageRate/delete/1 [WORKING]
http://127.0.0.1:8082/milageRate/details/1 [WORKING]
http://127.0.0.1:8082/milageRate/edit/1 [WORKING]

3 Respond by executing CRUD actions:

http://127.0.0.1:8082/milageRate/save [WORKING]
http://127.0.0.1:8082/milageRate/save/1 [WORKING]
http://127.0.0.1:8082/milageRate/1 [WORKING]
*/