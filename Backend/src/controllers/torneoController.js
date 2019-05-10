'use strict'

var Equipo = require('../models/equipo');
var Liga = require('../models/liga');
var path = require('path');
var fs = require('fs');

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
    var nuevoEquipo = new Equipo();
    nuevoEquipo.nombreEquipo = req.body.nombreEquipo;
    nuevoEquipo.golesAFavor = req.body.golesAFavor;
    nuevoEquipo.golesEnContra = req.body.golesEnContra;
    nuevoEquipo.diferenciaDeGoles = nuevoEquipo.golesAFavor - nuevoEquipo.golesEnContra;
    nuevoEquipo.partidosJugados = req.body.partidosJugados;
    nuevoEquipo.puntos = req.body.puntos;
    nuevoEquipo.imagen = '';
    nuevoEquipo.liga = req.body.liga;
    console.log(nuevoEquipo)

    Equipo.find( { nombreEquipo: nuevoEquipo.nombreEquipo }, (err, equipos) => {
            if(err) return res.status(500).send({message: 'Error, contacte a su administrador.', err});

            if(equipos.length > 0) {
                return res.status(500).send({ message: 'El equipo ya existe' });
            } else {
                Equipo.find({liga: nuevoEquipo.liga},(err, equipostotal) => {
                    if(equipostotal.length < 10) {
                        console.log(nuevoEquipo)
                        nuevoEquipo.save((err, equipo) => {
                            console.log(nuevoEquipo)
                            console.log(err)
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

        if(!equipos) return res.status(404).send({ message: 'Aun no hay equipos en esta liga, prueba creando uno' })
        return res.status(200).send({equipos});
    });
}

function subirImagen(req, res) { 
    if(req.files){
        console.log(req.files);
        var file_path = req.files.imagen.path;
        console.log(file_path);
        
        var file_split = file_path.split('\\');
        console.log(file_split);

        var file_name = file_split[2];
        console.log(file_name);

        var ext_split = file_name.split('\.');
        console.log(ext_split);

        var file_ext = ext_split[1];
        console.log(file_ext);

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
            Equipo.findByIdAndUpdate(req.params.id, {imagen: file_name}, {new:true}, (err, equipoActualizado)=>{
                if(err) return res.status(500).send({message: 'No se a podido actualizar el equipo'})
                
                if(!equipoActualizado) return res.status(404).send({message: 'Error en los datos del usuario, no se pudo actualizar'})
                
                return res.status(200).send({user: equipoActualizado});
            });
        } else{
            return removeFilesOfUploads(res, file_path, 'Extension no valida')
        }
        
    }
}

function removeFilesOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err)=>{
        return res.status(200).send({message: message})
    })
}

function obtenerImagen(req, res) {
    var image_file = req.params.nombreImagen;
    var path_file = './src/uploads/' + image_file;

    fs.exists(path_file, (exists)=>{
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'no existe la imagen'})
        }
    });
}

module.exports = {
    agregarEquipo,
    agregarLiga,
    editarEquipo,
    borrarEquipo,
    obtenerEquiposPorLiga,
    obtenerLigas,
    editarLiga,
    subirImagen,
    obtenerImagen
}
