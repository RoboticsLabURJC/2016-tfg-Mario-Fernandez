var _       = require('lodash'),
    config  = require('../config'),
    jwt     = require('jsonwebtoken'),
    mongoose = require('mongoose');

var DataProfesor = mongoose.model('Profesor');
var ProfesorScheme  = mongoose.model('LoginProfesor');

function createToken(user) {
  return jwt.sign(_.omit(user, 'Password'), config.secret, { expiresInMinutes: 1 });
}

exports.registerprofesor = function(req, res) {
	console.log('POSTCACA');
	console.log(req.body);

  var datos = new DataProfesor(
  { nombre:       req.body.Nombre,
    apellidos:    req.body.Apellidos,
    edad:         req.body.Edad,
    curso:        req.body.Curso,
    loc: {
      lat: req.body.Loc.lat,
      lng: req.body.Loc.lng
    }
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
    ProfesorScheme.find({}, function(err, dataprof){
        DataProfesor.populate(dataprof, {path: "data"}, function(err, dataprofext){
		      res.status(200).jsonp(dataprofext);
        })
    });
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
