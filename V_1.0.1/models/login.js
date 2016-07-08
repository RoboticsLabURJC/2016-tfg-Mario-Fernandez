var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Pharma = mongoose.model('Pharma');

var loginSchema  = new Schema({
  name:         { type: String },
  password:     { type: Number },
  id_pharma:    { type: Schema.ObjectId, ref: "Pharma"}
});
module.exports = mongoose.model('Login', loginSchema);
