var _       = require('lodash'),
    config  = require('../config'),
    jwt     = require('jsonwebtoken'),
    mongoose = require('mongoose');

var DataAlumno = mongoose.model('Alumno');
var AlumnoScheme  = mongoose.model('LoginAlumno');

function createToken(user) {
  return jwt.sign(_.omit(user, 'Password'), config.secret, { expiresInMinutes: 30 });
}

exports.registeralumno = function(req, res) {
	console.log(req.body);

  var datos = new DataAlumno(
  { nombre: req.body.Nombre,
    apellidos:    req.body.Apellidos,
    edad:         req.body.Edad });

	var alumno = new AlumnoScheme(
  { email:       req.body.Email,
    password:     req.body.Password,
    data : datos});

  //comprobar si el Nick ya existe
  AlumnoScheme.find( { "email": alumno.email }, function(err, data) {
    console.log(data);
    if (data.length == 0){
      if (!alumno.email || !alumno.password) {
        res.status(400).send("You must send the username and the password");
      }else{
        alumno.save(function(err, datasave) {
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

exports.loginalumno = function(req, res) {
  console.log(req.body);
  AlumnoScheme.find({"email" : req.body.Email}, function(err, login) {
    if (login.length != 0){
      DataAlumno.populate(login, {path: "data"},function(err, libros){
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
