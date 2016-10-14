var _       = require('lodash'),
    config  = require('../config'),
    jwt     = require('jsonwebtoken'),
    mongoose = require('mongoose');

var DataProfesor = mongoose.model('Profesor');
var ProfesorScheme  = mongoose.model('LoginProfesor');

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 1 });
}

exports.registerprofesor = function(req, res) {
	console.log('POSTCACA');
	console.log(req.body);

  var datos = new DataProfesor(
  { nombre:       req.body.nombre,
    apellidos:    req.body.apellidos,
    edad:         req.body.edad,
    curso:        req.body.curso,
    loc: {
      lat: req.body.loc.lat,
      lng: req.body.loc.lng
    }
  });

	var profesor = new ProfesorScheme(
  { email:       req.body.email,
    password:     req.body.password,
    data : datos});

  //comprobar si el Nick ya existe
  ProfesorScheme.find( { "email": req.body.email }, function(err, data) {
    console.log(data);
    if (data.length == 0){
      if (!req.body.email || !req.body.password) {
        res.status(400).send("You must send the username and the password");
      }else{
        profesor.save(function(err, datasave) {
          if(err) return res.send(500, err.message);
          var profile = _.pick(req.body, 'email', 'password', 'extra');
          profile.id = datasave._id;
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

exports.loginprofesor = function(req, res) {
  ProfesorScheme.find({"email" : req.body.email}, function(err, login) {
    if (login.length != 0){
      DataProfesor.populate(login, {path: "data"},function(err, libros){
        console.log(libros);
        var profile = _.pick(req.body, 'email', 'password', 'extra');
        profile.id = libros[0].data.nombre;
        res.status(201).send({ id_token: createToken(profile) });
      });
    }else{
      res.status(401).send("The username or password don't match");
    }
  });
};
