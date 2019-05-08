'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LigaSchema = Schema({
    nombreLiga: String
});

module.exports = mongoose.model('Ligas', LigaSchema);