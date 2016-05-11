var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose'),
    path = require('path');;

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
require("./models/autor");
require("./models/tvshow");
var TVShowCtrl = require('./controllers/tvshows');

//angular 2
var index = require('./routes/index');

//Example Route
var router = express.Router();
var tvshows = express.Router();


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', tvshows);

//API ROUTES
tvshows.route('/autor')
  .post(TVShowCtrl.addautor)
  .get(TVShowCtrl.findAllAutor)

tvshows.route('/tvshows')
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

tvshows.route('/tvshowsautor')
  .get(TVShowCtrl.findAllTVShowsAutor);

tvshows.route('/tvshows/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);




// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
