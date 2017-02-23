// Module dependencies.
const http = require("http");
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
var _ = require('lodash');
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const YAML = require('require-yaml');
const port = 8082;
const engines = require('consolidate')

const compression = require('compression');
const session = require('express-session');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, 'uploads') });

// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.load({ path: '.env.example' });

// Controllers (route handlers).
const homeController = require('./controllers/home');
const userController = require('./controllers/user');
const apiController = require('./controllers/api');
const contactController = require('./controllers/contact');

// API keys and Passport configuration.
const passportConfig = require('./config/passport');

// =========================================================

// set up a temporary (in memory) database
const Datastore = require('nedb');
//var dbtoexpress = require("db-to-express-rest");

var db = new Datastore();
db.loadDatabase();

// Connect to MongoDB.
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

// =========================================================

// create express app 
const app = express();
app.set('port', process.env.PORT || port);

// set the root view folder & specify the view engine 
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', engines.ejs);
app.set("view engine", "ejs");

app.use(expressStatusMonitor());
app.use(compression());
/*
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
*/

// specify various resources and apply them to our application
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(expressValidator());
app.use(express.static(__dirname + '/assets/'));  // works for views in root view folder
app.use(expressLayouts);


/* ============= LATER ==================
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());
app.use((req, res, next) => {
  if (req.path === '/api/upload') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
      req.path !== '/login' &&
      req.path !== '/signup' &&
      !req.path.match(/^\/auth/) &&
      !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
      req.path == '/account') {
    req.session.returnTo = req.path;
  }
  next();
});


 ================= END LATER ================ */

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

// Set up SEED DATA  .................................................

// Read in the sample data files
var aggregateMaterials = require('./data/aggregateMaterials.yml');
var estimates = require('./data/estimates.json');
var flooringCoatings = require('./data/flooringCoatings.yml');
var mileageRates = require('./data/mileageRates.json');
var roofingBasecoats = require('./data/roofingBasecoats.yml');
var roofingCoatings = require('./data/roofingCoatings.yml');
var roofingEstimates = require('./data/roofingEstimates.json');
var roofingPrimers = require('./data/roofingPrimers.json');
var roofingTopcoats = require('./data/roofingTopcoats.yml');
var waterproofingBasecoats = require('./data/waterproofingBasecoats.yml');
var waterproofingPrimers = require('./data/waterproofingPrimers.json');
var waterproofingTopcoats = require('./data/waterproofingTopcoats.yml');

// insert the sample data into our data store
db.insert(aggregateMaterials);
db.insert(estimates);
db.insert(flooringCoatings);
db.insert(mileageRates);
db.insert(roofingBasecoats);
db.insert(roofingCoatings);
db.insert(roofingEstimates);
db.insert(roofingPrimers);
db.insert(roofingTopcoats);
db.insert(waterproofingBasecoats);
db.insert(waterproofingPrimers);
db.insert(waterproofingTopcoats);

// intialize app.locals (these objects will be available to our controllers)
app.locals.aggregateMaterials = db.find(aggregateMaterials);
app.locals.estimates = db.find(estimates);
app.locals.flooringCoatings = db.find(flooringCoatings);
app.locals.mileageRates = db.find(mileageRates);
app.locals.roofingBasecoats = db.find(roofingBasecoats);
app.locals.roofingCoatings = db.find(roofingCoatings);
app.locals.roofingPrimers = db.find(roofingPrimers);
app.locals.roofingTopcoats = db.find(roofingTopcoats);
app.locals.waterproofingBasecoats = db.find(waterproofingBasecoats);
app.locals.waterproofingPrimers = db.find(waterproofingPrimers);
app.locals.waterproofingTopcoats = db.find(waterproofingTopcoats);

// verify our sample data was imported correctly
console.log(Object.keys(aggregateMaterials).length+ " aggregateMaterials");
console.log(Object.keys(estimates).length+ " estimates");
console.log(Object.keys(flooringCoatings).length+ " flooringCoatings");
console.log(Object.keys(mileageRates).length+ " mileageRates");
console.log(Object.keys(roofingBasecoats).length+ " roofingBasecoats");
console.log(Object.keys(roofingCoatings).length+ " roofingCoatings");
console.log(Object.keys(roofingPrimers).length+ " roofingPrimers");
console.log(Object.keys(roofingTopcoats).length+ " roofingTopcoats");
console.log(Object.keys(waterproofingBasecoats).length+ " waterproofingBasecoats");
console.log(Object.keys(waterproofingPrimers).length+ " waterproofingPrimers");
console.log(Object.keys(waterproofingTopcoats).length+ " waterproofingTopcoats");

// Set up ROUTING .................................................

// Request to this URI will be handled by this CONTROLLER..........
app.use('/', require('./controllers/index.js'));
app.use('/about', require('./controllers/about.js'));
app.use('/aggregate', require('./controllers/aggregateMaterials.js'));
app.use('/estimate', require('./controllers/estimate.js'));
app.use('/flooringCoating', require('./controllers/flooringCoatings.js'));
app.use('/mileageRate', require('./controllers/mileageRate.js'));
app.use('/prospect', require('./controllers/prospects.js'));
app.use('/roofingBasecoat', require('./controllers/roofingBasecoats.js'));
app.use('/roofingCoating', require('./controllers/roofingCoatings.js'));
app.use('/roofingPrimer', require('./controllers/roofingPrimers.js'));
app.use('/roofingTopcoat', require('./controllers/roofingTopcoats.js'));
app.use('/waterproofingBasecoat', require('./controllers/waterproofingBasecoats.js'));
app.use('/waterproofingPrimer', require('./controllers/waterproofingPrimers.js'));
app.use('/waterproofingTopcoat', require('./controllers/waterproofingTopcoats.js'));

// Primary app routes.
app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

// API examples routes.
app.get('/api', apiController.getApi);
app.get('/api/lastfm', apiController.getLastfm);
app.get('/api/nyt', apiController.getNewYorkTimes);
app.get('/api/aviary', apiController.getAviary);
app.get('/api/steam', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getSteam);
app.get('/api/stripe', apiController.getStripe);
app.post('/api/stripe', apiController.postStripe);
app.get('/api/scraping', apiController.getScraping);
app.get('/api/twilio', apiController.getTwilio);
app.post('/api/twilio', apiController.postTwilio);
app.get('/api/clockwork', apiController.getClockwork);
app.post('/api/clockwork', apiController.postClockwork);
app.get('/api/foursquare', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFoursquare);
app.get('/api/tumblr', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTumblr);
app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
app.get('/api/github', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getGithub);
app.get('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTwitter);
app.post('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postTwitter);
app.get('/api/linkedin', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getLinkedin);
app.get('/api/instagram', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getInstagram);
app.get('/api/paypal', apiController.getPayPal);
app.get('/api/paypal/success', apiController.getPayPalSuccess);
app.get('/api/paypal/cancel', apiController.getPayPalCancel);
app.get('/api/lob', apiController.getLob);
app.get('/api/upload', apiController.getFileUpload);
app.post('/api/upload', upload.single('myFile'), apiController.postFileUpload);
app.get('/api/pinterest', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getPinterest);
app.post('/api/pinterest', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postPinterest);
app.get('/api/google-maps', apiController.getGoogleMaps);

//OAuth authentication routes. (Sign in)
app.get('/auth/instagram', passport.authenticate('instagram'));
app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

// OAuth authorization routes. (API examples)
app.get('/auth/foursquare', passport.authorize('foursquare'));
app.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), (req, res) => {
  res.redirect('/api/foursquare');
});
app.get('/auth/tumblr', passport.authorize('tumblr'));
app.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), (req, res) => {
  res.redirect('/api/tumblr');
});
app.get('/auth/steam', passport.authorize('openid', { state: 'SOME STATE' }));
app.get('/auth/steam/callback', passport.authorize('openid', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/pinterest', passport.authorize('pinterest', { scope: 'read_public write_public' }));
app.get('/auth/pinterest/callback', passport.authorize('pinterest', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/api/pinterest');
});

// end routing ================================================

app.use(errorHandler());

// handle page not found errors
app.use(function (request, response) {
  response.status(404).render("404.ejs");
});

/*
// create server by injecting our express app
var server = http.createServer(app);

// Listen for an application http request on port 8081 
server.listen(port, function () {
  console.log('Listening on http://127.0.0.1:' + port);
});
*/
app.listen(app.get('port'), () => {
  console.log('For a better experience, always PULL new code before any modifications.');
  console.log('Pull, SMALL change, test, commit.');
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;


