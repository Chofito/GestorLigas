'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipoSchema = Schema({
    nombreEquipo: String,
    golesAFavor: Number,
    golesEnContra: Number,
    diferenciaDeGoles: Number,
    partidosJugados: Number,
    puntos: Number,
    imagen: String,
    liga: {type: Schema.Types.ObjectId, ref: 'Ligas'}
});

module.exports = mongoose.model('Equipos', EquipoSchema);