var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var profesorSchema  = new Schema({
  nombre:       { type: String },
  apellidos:    { type: String },
  edad:         { type: String },
  curso:        {  type: String, enum:
  ['Primaria', 'ESO', 'Bachillerato', 'Universidad', 'F.P.', 'Examenes'] },
  loc:          {
    lat: {type : Number},
    lng: {type: Number}
  }
});
module.exports = mongoose.model('Profesor', profesorSchema);
