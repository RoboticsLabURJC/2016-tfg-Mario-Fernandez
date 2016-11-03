var _       = require('lodash'),
    config  = require('../config'),
    jwt     = require('jsonwebtoken'),
    mongoose = require('mongoose')
    main     = require('../server');

var DataProfesor = mongoose.model('Profesor');
var ProfesorScheme  = mongoose.model('LoginProfesor');


function createToken(user) {
  return jwt.sign(_.omit(user, 'Password'), config.secret, { expiresInMinutes: 1 });
}

exports.registerprofesor = function(req, res) {
	console.log(req.body);

  var datos = new DataProfesor(
  { nombre:       req.body.Nombre,
    apellidos:    req.body.Apellidos,
    edad:         req.body.Edad,
    curso:        req.body.Curso,
    asignaturas:   req.body.Clase,
    location: {
      type: "Point",
      coordinates: [req.body.Loc.lat, req.body.Loc.lng]
    },
    path: req.body.Path
  });

	var profesor = new ProfesorScheme(
  { email:       req.body.Email,
    password:     req.body.Password,
    data : datos});

  //comprobar si el Nick ya existe
  ProfesorScheme.find( { "email": profesor.email }, function(err, data) {
    console.log(data);
    if (data.length == 0){
      if (!profesor.email || !profesor.password) {
        res.status(400).send("You must send the username and the password");
      }else{
        profesor.save(function(err, datasave) {
          console.log(datasave);
          if(err) return res.send(500, err.message);
          var profile = _.pick(req.body, 'Email', 'Password', 'extra');
          profile.id = datasave.data;
          res.status(201).send({ id_token: createToken(profile) });
        });
        datos.save(function(err, datasave) {
          if(err) return res.send(500, err.message);
          console.log(datasave);
        });
      }
    }else{
        res.status(400).send("A user with that username already exists");
    }
  });
};

exports.getallprofesores = function(req, res){
    console.log('GET /getallprofesores');
      DataProfesor.find({}, function(err, dataprof){
		      res.status(200).jsonp(dataprof);
      });
};

exports.getimg = function(req, res){
  res.sendfile('uploads/'+ req.params.id)
};

exports.postimg = function(req, res){
  ProfesorScheme.findOne({"email" : req.file.originalname}, function(err, data) {
    console.log(data);
    DataProfesor.findById(data.data, function(err, dataext) {
        dataext.path = req.file.path;
        dataext.save();
    });
  });
  res.end('File is uploaded');
};

exports.loginprofesor = function(req, res) {
  ProfesorScheme.find({"email" : req.body.Email}, function(err, login) {
    if (login.length != 0){
      DataProfesor.populate(login, {path: "data"},function(err, libros){
        console.log(libros);
        var profile = _.pick(req.body, 'Email', 'Password', 'extra');
        profile.id = libros[0].data;
        res.status(201).send({ id_token: createToken(profile) });
      });
    }else{
      res.status(401).send("The username or password don't match");
    }
  });
};

exports.queryprofesores = function(req, res) {
  DataProfesor.find({"curso" : req.body.Curso, "asignaturas": req.body.Clase,
  location:{$geoWithin:{$centerSphere: [ [ req.body.Loc.lat, req.body.Loc.lng],
  req.body.Radio / 6378100 ] } } },  function(err, dataprof){
	      res.status(200).jsonp(dataprof);
  });
};
