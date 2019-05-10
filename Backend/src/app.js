'use strict'

//VARIABLES GLOBALES
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression')

const app = express();

//CARGAR RUTAS
var routes = require('./routes/routes');

//MIDDLEWARES
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//CABEZERAS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

//RUTAS
app.use('/api', routes);

//EXPORTAR
module.exports = app;