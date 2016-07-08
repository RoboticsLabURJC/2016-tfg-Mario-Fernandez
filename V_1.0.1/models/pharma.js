var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pharmaSchema = new Schema({
    horarios: String,
    location: String,
    type:    { type: String, enum:
    ['24 Hours', 'Herbalist', 'Botany', 'Clinical Pharmacy']}
});

module.exports = mongoose.model('Pharma', pharmaSchema);
