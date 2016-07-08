var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose'),
    path = require('path');

// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tvshows');

//midleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Database');
});

// Import Models and controllers
require("./models/pharma");
require("./models/login");

var Controller = require('./controllers/controller');

//angular 2
var index = require('./routes/index');

//Example Route
var router = express.Router();
var users = express.Router();


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', users);



//API ROUTES
users.route('/pharmacys')
  .post(Controller.addpharma)
  .get(Controller.findAllPharma)

users.route('/login')
  .get(Controller.findAllLogins)
  .post(Controller.addlogin);

users.route('/loginspharma')
  .get(Controller.findAllloginpharma);

users.route('/login/:id')
  .get(Controller.findById)
  .put(Controller.updatelogin)
  .delete(Controller.deletelogin);


// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
