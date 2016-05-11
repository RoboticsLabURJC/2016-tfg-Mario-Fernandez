var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Autor = mongoose.model('Autor');

var tvshowSchema = new Schema({
  title:    { type: String },
  year:     { type: Number },
  autor:    { type: Schema.ObjectId, ref: "Autor"},
  genre:    { type: String, enum:
  ['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy']},
});
module.exports = mongoose.model('TVShow', tvshowSchema);
