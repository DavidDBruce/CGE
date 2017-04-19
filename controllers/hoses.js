//Team Hoses!


var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
var Model = require('../models/hoses.js');

const notfoundstring = 'No such hose';



// see app.js for the root request this controller handles

// GET to this controller root URI
api.get("/", function (request, response) {
    return response.render('hoses/index.ejs');
});

api.get('/findall', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var data = req.app.locals.hoses.query;
    res.send(JSON.stringify(data));
});
api.get('/findone/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = parseInt(req.params.id);
    var data = req.app.locals.hoses.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    res.send(JSON.stringify(item));
});


// see app.js for the root request this controller handles
//GET create 
api.get('/create', function (request, response) {
    response.render("hoses/create.ejs");
});


//GET /delete/:id 
api.get('/delete/:id', function (req, res) {
    console.log("Handling GET /delete/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.hoses.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('hoses/delete.ejs',
        {
            title: "RT",
            layout: "layout.ejs",
            hoses: item
        });
});

// GET /details/:id
api.get('/details/:id', function (req, res) {
    console.log("Handling GET /details/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.hoses.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('hoses/details.ejs',
        {
            title: "RT",
            layout: "layout.ejs",
            hoses: item
        });
});

// GET one
api.get('/edit/:id', function (req, res) {
    console.log("Handling GET /edit/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.hoses.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('hoses/edit.ejs',
        {
            title: "RT",
            layout: "layout.ejs",
            hoses: item
        });
});

//For deactivate button proposed in class.

api.get('/active/:id/:ison', function(req,res){
    console.log("Handling POST /active/:id/:ison " + req);
    var id = parseInt(req.params.id);
    var ison = req.params.ison=="true"?true:false;
    var data = req.app.locals.hoses.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    item.isactive = ison;
    res.redirect("/hoses");
});

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', function (req, res) {
    console.log("Handling POST " + req);
    var data = req.app.locals.hoses.query;
    var item = new Model;
    console.log("NEW ID " + req.body._id);
    item._id = parseInt(req.body._id);
    item.name = req.body.name;
    item.unit = req.body.unit;
    item.price = req.body.price;
    item.displayorder = parseInt(req.body.displayorder);
    data.push(item);
    console.log("SAVING NEW ITEM " + JSON.stringify(item));
    return res.redirect('/hoses');
});

// POST update
api.post('/save/:id', function (req, res) {
    console.log("Handling SAVE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling SAVING ID=" + id);
    var data = req.app.locals.hoses.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("ORIGINAL VALUES " + JSON.stringify(item));
    console.log("UPDATED VALUES: " + JSON.stringify(req.body));
    item.name = req.body.name;
    item.unit = req.body.unit;
    item.price = req.body.price;
    item.displayorder = req.body.displayorder;
    console.log("SAVING UPDATED ITEM " + JSON.stringify(item));
    return res.redirect('/hoses');
});

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', function (req, res, next) {
    console.log("Handling DELETE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling REMOVING ID=" + id);
    var data = req.app.locals.hoses.query;
    var item = remove(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("Deleted item " + JSON.stringify(item));
    return res.redirect('/hoses');
});

module.exports = api;
/* 10 controller methods handled by controller:


controllers/hoses.js

2 Respond with JSON:

http://127.0.0.1:8081/hoses/findall [WORKING]
http://127.0.0.1:8081/hoses/findone/1 [WORKING]

5 Respond with CRUD Views:

http://127.0.0.1:8081/hoses [WORKING]
http://127.0.0.1:8081/hoses/create [WORKING]
http://127.0.0.1:8081/hoses/delete/1 [WORKING]
http://127.0.0.1:8081/hoses/details/1 [WORKING]
http://127.0.0.1:8081/hoses/edit/1 [WORKING]

3 Respond by executing CRUD actions:

http://127.0.0.1:8081/hoses/save [WORKING]
http://127.0.0.1:8081/hoses/save/1 [WORKING]
http://127.0.0.1:8081/hoses/delete/1 [WORKING]

*/
