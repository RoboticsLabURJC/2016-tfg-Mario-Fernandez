//File: controllers/tvshows.js
var mongoose = require('mongoose');
var Login  = mongoose.model('Login');
var Pharma  = mongoose.model('Pharma');

//GET - Return all Login_Pharma in the DB
exports.findAllLogins = function(req, res) {
	Login.find(function(err, Logins) {
    if(err) res.send(500, err.message);
    console.log('GET/Login')
		res.status(200).jsonp(Logins);
	});
};

//GET - Return all autor in the DB
exports.findAllPharma = function(req, res) {
	Pharma.find(function(err, Pharmacys) {
    if(err) res.send(500, err.message);

    console.log('GET/Pharmacys')
		res.status(200).jsonp(Pharmacys);
	});
};

////GET - Return all tvshow with you autor in the DB
exports.findAllloginpharma = function(req, res) {
    Login.find({}, function(err, logins) {
        Pharma.populate(logins, {path: "pharma"},function(err, logins){
            res.status(200).jsonp(logins);
        });
    });
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {
	Login.findById(req.params.id, function(err, login) {
    if(err) return res.send(500, err.message);
    console.log('GET/tvshow/' + req.params.id);
		res.status(200).jsonp(login);
	});
};

//POST - Insert a new pharma in DB
exports.addpharma = function(req, res) {
	console.log('POST');
	console.log(req.body);
	var pharma = new Pharma({
		horarios: req.body.horarios,
		location: req.body.location,
		type:     req.body.type
	});

	pharma.save(function(err, pharma) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(pharma);
	});
};

//POST - Insert a new TVShow in the DB
exports.addlogin = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var login = new Login({
		name:      req.body.name,
		password:  req.body.password,
		id_pharma: req.body.id_pharma
	});

	login.save(function(err, login) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(login);
	});
};

//PUT - Update a register already exists
exports.updatelogin = function(req, res) {
	Login.findById(req.params.id, function(err, login) {
		login.name   = req.body.petId;
		login.password    = req.body.password;
		login.id_pharma = req.body.id_pharma;

		login.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(login);
		});
	});
};

//DELETE - Delete a TVShow with specified ID
exports.deletelogin = function(req, res) {
	Login.findById(req.params.id, function(err, login) {
		login.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};
