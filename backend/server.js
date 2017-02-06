var logger          = require('morgan'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    dotenv          = require('dotenv'),
    mongoose        = require('mongoose'),
    path            = require('path');
    bodyParser      = require('body-parser'),
    multer          = require('multer'),
    path            = require('path');

var app = express();


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/classcity');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Database');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'bower_components')));
//app.use('/uploads:id', express.static(__dirname + 'uploads'));

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://ec2-54-145-99-112.compute-1.amazonaws.com:3000");
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log(file.fieldname);
    var name = file.fieldname + '-' + Date.now() + '.jpg';
    cb(null, name)
  }
})
var upload = multer({ storage: storage })
app.use(multer(upload).single('file'));


require("./models/alumno");
require("./models/loginalumno");
require("./models/profesor");
require("./models/loginprofesor");
var Ctrlalumno = require('./controllers/contalumno');
var Ctrlprofesor = require('./controllers/contprofesor');
var socketServer = require('./controllers/socket');

//Rutas
var users = express.Router();
var img = express.Router();
app.use('/', users);
app.use("/uploads", express.static(__dirname + '/uploads'), img);
socketServer.start();

img.route('/:id')
  .get(Ctrlprofesor.getimg)

img.route('/')
  .post(Ctrlprofesor.postimg)

users.route('/registeralumno')
  .post(Ctrlalumno.registeralumno);

users.route('/loginalumno')
  .post(Ctrlalumno.loginalumno);

users.route('/registerprofesor')
  .post(Ctrlprofesor.registerprofesor);

users.route('/loginprofesor')
  .post(Ctrlprofesor.loginprofesor);

users.route('/profesores')
  .get(Ctrlprofesor.getallprofesores)
  .post(Ctrlprofesor.queryprofesores)

users.route('/detail/:id')
  .get(Ctrlprofesor.getdetail)

  // Start server
  app.listen(8080,'0.0.0.0', function() {
    console.log("Node server running on http://localhost:8080");
  });
