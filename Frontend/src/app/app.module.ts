import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TorneoComponent } from './components/torneo/torneo.component';
import { TorneoService } from './services/torneo.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SubirImagenService } from './services/subir-imagen.service';

@NgModule({
  declarations: [
    AppComponent,
    TorneoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [TorneoService, SubirImagenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
