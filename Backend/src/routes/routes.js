'use strict'

var express = require('express');
var TorneoController = require('../controllers/torneoController');

//Rutas
var api = express.Router();
api.post('/agregar-liga', TorneoController.agregarLiga);
api.post('/agregar-equipo', TorneoController.agregarEquipo);
api.put('/editar-equipo/:id', TorneoController.editarEquipo);
api.put('/editar-liga/:id', TorneoController.editarLiga);
api.post('/borrar-equipo/:id', TorneoController.borrarEquipo);
api.get('/obtener-ligas', TorneoController.obtenerLigas);
api.post('/obtener-equipos-porliga/:id', TorneoController.obtenerEquiposPorLiga);

module.exports = api;