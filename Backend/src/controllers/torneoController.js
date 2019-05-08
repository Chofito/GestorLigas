'use strict'

var Equipo = require('../models/equipo');
var Liga = require('../models/liga')

function agregarLiga(req, res) {
    var nuevaLiga = new Liga(req.body);
    var nombreLiga = req.body.nombreLiga

    Liga.find({nombreLiga: nombreLiga.toLowerCase()}, (err, ligas) => {
        if (err) return res.status(500).send({ message: 'Error al crear la liga, contacte al administrador.', err });

        if (ligas.length > 0) {
            return res.status(500).send({ message: 'La liga que desea crear ya existe.' }) 
        } else {
            nuevaLiga.save((err, liga) => {
                if(err) return res.status(500).send({ message: 'Error al guardar la liga', err });

                if(liga){
                    res.status(200).send({ liga })
                }else{
                    res.status(404).send({message: 'No se ha registrado la liga' });
                }
            });
        }

    });
}

function agregarEquipo(req, res) {
    var nuevoEquipo = new Equipo(req.body);

    Equipo.find( { nombreEquipo: nuevoEquipo.nombreEquipo }, (err, equipos) => {
            if(err) return res.status(500).send({message: 'Error, contacte a su administrador.', err});

            if(equipos.length > 0) {
                return res.status(500).send({ message: 'El equipo ya existe' });
            } else {
                Equipo.find({liga: nuevoEquipo.liga},(err, equipostotal) => {
                    if(equipostotal.length < 10) {
                        nuevoEquipo.save((err, equipo) => {
                            if(err) return res.status(500).send({ message: 'Error al guardar el equipo.', err });
        
                            if(equipo){
                                res.status(200).send({ equipo })
                            }else{
                                res.status(404).send({message: 'No se ha registrado el equipo.' });
                            }
                        });
                    } else {
                        return res.status(500).send({ message: 'Has alcanzado el maximo de equipos en esta liga.' })
                    }
                });
            }
        }
    );
}

function editarEquipo(req, res) {
    var equipoId = req.params.id;

    Equipo.findByIdAndUpdate(equipoId, req.body, { new: true }, (err, updated) => {
        if(err) return res.status(500).send({message: 'Error, contacte a su administrador', err});

        if(updated) return res.status(200).send({ updated })
    });
}

function editarLiga(req, res) {
    var ligaId = req.params.id;

    Liga.findByIdAndUpdate(ligaId, req.body, { new: true }, (err, updated) => {
        if(err) return res.status(500).send({message: 'Error, contacte a su administrador', err});

        if(updated) return res.status(200).send({ updated })
    });
}

function borrarEquipo(req, res) {
    var equipoId = req.params.id;
    
    Equipo.findByIdAndRemove(equipoId, (err, borrado) => {
        if(err) return res.status(500).send({message: 'Error, contacte a su administrador', err});

        if(updated) return res.status(200).send({ borrado })
    });
}

function obtenerLigas(req, res) {
    Liga.find((err, ligas) => {
        if(err) return res.status(500).send({message: 'Error, contacte a su administrador', err});

        if(ligas.length > 0) return res.status(200).send({ ligas })
        else return res.status(404).send({ message: 'Aun no hay ligas, prueba creando una' });
    });
}

function obtenerEquiposPorLiga(req, res) {
    var ligaId = req.params.id;

    Equipo.find({ liga: ligaId }, (err, equipos) => {
        if(err) return res.status(500).send({message: 'Error, contacte a su administrador', err});

        if(equipos.length > 0) return res.status(200).send({ equipos })
        else return res.status(404).send({ message: 'Aun no hay equipos en esta liga, prueba creando uno' });
    });
}

module.exports = {
    agregarEquipo,
    agregarLiga,
    editarEquipo,
    borrarEquipo,
    obtenerEquiposPorLiga,
    obtenerLigas,
    editarLiga
}
