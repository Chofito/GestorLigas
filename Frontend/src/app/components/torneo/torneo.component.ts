import { Component, OnInit } from '@angular/core';
import { TorneoService } from '../../services/torneo.service';
import { Liga } from '../../models/liga.model';
import { Equipo } from '../../models/equipo.model';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

export interface ChartData {
  data: Number[],
  label: String
}

@Component({
  selector: 'app-torneo',
  templateUrl: './torneo.component.html',
  styleUrls: ['./torneo.component.scss']
})
export class TorneoComponent implements OnInit {
  public modalVisible: Boolean = false;
  public ligas: [Liga];
  public equiposLiga: [Equipo]
  public options;
  public mostrar: Boolean = false;
  public noHay: Boolean = false;
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
  ]
  
  constructor(
    private _torneoService: TorneoService
  ) { }

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };

  public radarChartLabels: Label[] = ['GF', 'GA', 'GD', 'Points', 'Played'];
  public radarChartData: ChartDataSets[] = [
    { data: [65, 59, 90, 81, 56], label: 'Series A' },
    { data: [28, 48, 40, 19, 96], label: 'Series B' }
  ];

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
    this.mostrar = true;
    console.log('hola')
    this._torneoService.obtenerEquiposPorLiga(id).subscribe(response => {
      if (response.equipos) {
        this.noHay = false;
        this.equiposLiga = response.equipos;
        this.clearArray(this.radarChartData)
        var i = 0;
        this.equiposLiga.forEach(element => {
          var a: ChartDataSets = {
            data: [
              Number(element.golesAFavor), 
              Number(element.golesEnContra), 
              Number(element.diferenciaDeGoles), 
              Number(element.puntos), 
              Number(element.partidosJugados)],
            label: String(element.nombreEquipo),
            backgroundColor: [ this.backColors[i] ],
            borderColor: [ this.borderColors[i] ],
            }
          this.radarChartData.push(a);
          i++;
        });
        
        console.log(this.radarChartData);
      } else if(response.message) {
        this.noHay = true;
        this.clearArray(this.equiposLiga) 
      }
    }, error => {
      this.noHay = true;
      this.clearArray(this.equiposLiga)
    });
    console.log(this.radarChartData)
  }

  clearArray(array) {
    while (array.length) {
      array.pop();
    }
  }

}
