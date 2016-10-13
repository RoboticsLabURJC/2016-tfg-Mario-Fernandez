var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    dotenv          = require('dotenv'),
    mongoose        = require('mongoose'),
    path            = require('path');
    bodyParser      = require('body-parser');

var app = express();

// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/alumnos');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Database');
});

dotenv.load();

// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(express.logger('dev'));
  app.use(errorhandler())
}

require("./models/alumno");
require("./models/loginalumno");
var Controller = require('./controllers/controller');


//Rutas
var users = express.Router();
app.use('/', users);

//API ROUTES
users.route('/registeralumno')
  .post(Controller.registeralumno);

users.route('/loginalumno')
  .post(Controller.loginalumno);



/*
users.route('/login')
  .get(Controller.findAllLogins)
  .post(Controller.addlogin);

users.route('/loginspharma')
  .get(Controller.findAllloginpharma);

users.route('/login/:id')
  .get(Controller.findById)
  .put(Controller.updatelogin)
  .delete(Controller.deletelogin);
*/
  // Start server
  app.listen(3001, function() {
    console.log("Node server running on http://localhost:3001");
  });
