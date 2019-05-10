import { Component, OnInit } from '@angular/core';
import { TorneoService } from '../../services/torneo.service';
import { Liga } from '../../models/liga.model';
import { Equipo } from '../../models/equipo.model';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { SubirImagenService } from 'src/app/services/subir-imagen.service';
import { GLOBAL } from 'src/app/services/global.service';

export interface ChartData {
  data: number[],
  label: string,
}

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.scss']
})
export class TorneoComponent implements OnInit {
  public modalVisible = false;
  public ligas: [Liga];
  public equiposLiga: [Equipo]
  public ligaNueva = new Liga('', '');
  public options;
  public mostrar = false;
  public noHay = false;
  public nombreNuevaLiga: string;
  public mostrarModalLiga = false;
  public mostrarModalEquipo = false;
  public mostrarModalMarcador = false;
  public filesToUpload: Array<File>;
  public url: string;

  public nombreEquipo: string;
  public golesAFavor: number;
  public golesEnContra: number;
  public diferenciaDeGoles: number;
  public partidosJugados: number;
  public puntos: number;
  public liga: string;
  public ligaEquipo: string;

  public backColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
  ];

  public borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
  ];

  constructor(
    private _torneoService: TorneoService,
    private _uploadService: SubirImagenService
  ) {
    this.url = GLOBAL.url;
  }

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };

  public radarChartLabels: Label[] = ['GF', 'GA', 'GD', 'Points', 'Played'];
  public radarChartData: ChartDataSets[] = [];

  public radarChartType = 'radar';

  ngOnInit() {
    this._torneoService.obtenerLigas().subscribe(response => {
      if (response.ligas) {
        console.log(response.ligas);
        this.ligas = response.ligas;
        this.noHay = false;
      }
    }, error => {
      console.log(error)
    });
  }

  hola(id) {
    console.log(this.equiposLiga)
    this.clearArray(this.radarChartData);
    this.mostrar = true;
    this.ligaEquipo = id;
    console.log(this.ligaEquipo);

    this._torneoService.obtenerEquiposPorLiga(this.ligaEquipo).subscribe(response => {
     
      if (response.equipos) {
        this.noHay = false;
        this.equiposLiga = response.equipos;
        this.clearArray(this.radarChartData)
        let i = 0;

        console.log(this.equiposLiga)

        if (this.equiposLiga.length > 0) {
          this.equiposLiga.forEach(element => {
            let a: ChartDataSets = {
              data: [
                element.golesAFavor,
                element.golesEnContra,
                element.diferenciaDeGoles,
                element.puntos,
                element.partidosJugados
              ],
              label: String(element.nombreEquipo),
              backgroundColor: [ this.backColors[i] ],
              borderColor: [ this.borderColors[i] ],
              }
            this.radarChartData.push(a);
            i++;
          });
        } else {
          console.log('hola')
        }

        this.equiposLiga.sort((a,b) => (a.puntos > b.puntos) ? -1 : ((b.puntos > a.puntos) ? 1 : 0));
        console.log(this.radarChartData);
      } else if(response.message) {
        this.noHay = true;
        this.clearArray(this.equiposLiga);
      }
    }, error => {
      console.log(error)
      this.noHay = true;
      this.clearArray(this.equiposLiga);
    });
  }

  clearArray(array) {
    while (array.length) {
      array.pop();
    }
  }

  agregarLiga() {
    this.mostrarModalLiga = !this.mostrarModalLiga;
    this._torneoService.agregarLiga(this.nombreNuevaLiga).subscribe(response => {
      console.log(response);
      this._torneoService.obtenerLigas().subscribe(response => {
        if (response.ligas) {
          console.log(response.ligas);
          this.ligas = response.ligas;
          this.noHay = false;
        }
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    })

    this.nombreNuevaLiga = '';
  }

  agregarEquipo() {
    this.mostrarModalEquipo = !this.mostrarModalEquipo;
    const nuevoTeam = new Equipo(
      '', this.nombreEquipo, this.golesAFavor,
      this.golesEnContra, this.diferenciaDeGoles,
      this.partidosJugados, this.puntos, '', this.ligaEquipo);

    console.log(nuevoTeam);

    this._torneoService.agregarEquipo(nuevoTeam).subscribe(response => {
      if (response.equipo) {
        console.log(response);
        this.equiposLiga.push(response.equipo);

        this._uploadService.makeFileRequest(this.url + 'subir-imagen/' + response.equipo._id, [], this.filesToUpload, 'imagen');
      }
    }, error => {
      console.log(error);
    });
    console.log(this.ligaEquipo);
    this.nombreEquipo = '';
    this.nombreEquipo = '';
    this.golesAFavor = 0;
    this.golesEnContra = 0;
    this.diferenciaDeGoles = 0;
    this.partidosJugados = 0;
    this.puntos = 0;
}

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput.target.files as Array<File>;
    /* this.filesToUpload = <Array<File>>fileInput.target.files; */
  }

}
