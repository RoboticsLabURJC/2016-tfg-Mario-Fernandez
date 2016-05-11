//File: controllers/tvshows.js
var mongoose = require('mongoose');
var TVShow  = mongoose.model('TVShow');
var Autor  = mongoose.model('Autor');

//GET - Return all tvshows in the DB
exports.findAllTVShows = function(req, res) {
	TVShow.find(function(err, tvshows) {
    if(err) res.send(500, err.message);

    console.log('GET /tvshows')
		res.status(200).jsonp(tvshows);
	});
};

//GET - Return all autor in the DB
exports.findAllAutor = function(req, res) {
	Autor.find(function(err, autors) {
    if(err) res.send(500, err.message);

    console.log('GET /tvshows')
		res.status(200).jsonp(autors);
	});
};

////GET - Return all tvshow with you autor in the DB
exports.findAllTVShowsAutor = function(req, res) {
    TVShow.find({}, function(err, tvshows) {
        Autor.populate(tvshows, {path: "autor"},function(err, tvshows){
            res.status(200).jsonp(tvshows);
        });
    });
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {
	TVShow.findById(req.params.id, function(err, tvshow) {
    if(err) return res.send(500, err.message);

    console.log('GET /tvshow/' + req.params.id);
		res.status(200).jsonp(tvshow);
	});
};

//POST - Insert a new autor in the DB
exports.addautor = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var autor = new Autor({
		nombre: req.body.nombre,
    fecha_de_nacimiento: req.body.fecha_de_nacimiento
	});

	autor.save(function(err, autor) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(autor);
	});
};

//POST - Insert a new TVShow in the DB
exports.addTVShow = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var tvshow = new TVShow({
		title:    req.body.title,
		year: 	  req.body.year,
		autor:    req.body.autor,
		genre:    req.body.genre
	});

	tvshow.save(function(err, tvshow) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(tvshow);
	});
};

//PUT - Update a register already exists
exports.updateTVShow = function(req, res) {
	TVShow.findById(req.params.id, function(err, tvshow) {
		tvshow.title   = req.body.petId;
		tvshow.year    = req.body.year;
		tvshow.autor = req.body.autor;
		tvshow.genre   = req.body.genre;


		tvshow.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(tvshow);
		});
	});
};

//DELETE - Delete a TVShow with specified ID
exports.deleteTVShow = function(req, res) {
	TVShow.findById(req.params.id, function(err, tvshow) {
		tvshow.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};
