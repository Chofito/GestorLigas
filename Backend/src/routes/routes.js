'use strict'

var express = require('express');
var TorneoController = require('../controllers/torneoController');

var multiparty = require('connect-multiparty');
var md_subir = multiparty({uploadDir: './src/uploads'})

//Rutas
var api = express.Router();
api.post('/agregar-liga', TorneoController.agregarLiga);
api.post('/agregar-equipo', TorneoController.agregarEquipo);
api.put('/editar-equipo/:id', TorneoController.editarEquipo);
api.put('/editar-liga/:id', TorneoController.editarLiga);
api.post('/borrar-equipo/:id', TorneoController.borrarEquipo);
api.get('/obtener-ligas', TorneoController.obtenerLigas);
api.post('/obtener-equipos-porliga/:id', TorneoController.obtenerEquiposPorLiga);
api.post('/subir-imagen/:id', md_subir, TorneoController.subirImagen);
api.get('/obtener-imagen/:nombreImagen', TorneoController.obtenerImagen);

module.exports = api;