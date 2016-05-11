var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var autorSchema = new Schema({
    nombre: String,
    fecha_de_nacimiento: String
});

module.exports = mongoose.model('Autor', autorSchema);
