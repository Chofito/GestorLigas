import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Equipo } from '../models/equipo.model';
import { Liga } from '../models/liga.model';
import { GLOBAL } from './global.service';

@Injectable()
export class TorneoService {
  public url: String;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  agregarLiga(nombreLiga: String): Observable<any> { //lista
    let params = JSON.stringify({nombreLiga: nombreLiga});
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'agregar-liga', params, { headers: headers });
  }

  agregarEquipo(equipo: Equipo): Observable<any> { //lista
    let params = JSON.stringify(equipo);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    console.log(params)

    return this._http.post(this.url + 'agregar-equipo', params, { headers: headers });
  }

  editarEquipo(equipo: Equipo, id: String): Observable<any> { //lista
    let params = JSON.stringify({
      nombreEquipo: equipo.nombreEquipo,
      golesAFavor: equipo.golesAFavor,
      golesEnContra: equipo.golesEnContra,
      diferenciaDeGoles: equipo.diferenciaDeGoles,
      partidosJugados: equipo.partidosJugados,
      puntos: equipo.puntos,
      liga: equipo.liga
    });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + 'editar-equipo/' + id, params, { headers: headers });
  }

  editarLiga(nombreLiga: String, ligaId: String): Observable<any> { //lista
    let params = JSON.stringify(nombreLiga);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + 'editar-liga/' + ligaId, params, { headers: headers });
  }

  borrarEquipo(equipoId: string): Observable<any> { //lista
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'borrar-equipo/' + equipoId, { headers: headers });
  }

  obtenerLigas(): Observable<any> { //lista
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + 'obtener-ligas', { headers: headers });
  }

  obtenerEquiposPorLiga(ligaId: string): Observable<any> { //lista
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'obtener-equipos-porliga/' + ligaId, { headers: headers });
  }
}
