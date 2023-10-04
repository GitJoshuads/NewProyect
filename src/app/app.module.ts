import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http' ; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentePruebaComponent } from './components/componente-prueba/componente-prueba.component';
import { LlamadaBinanceComponent } from './components/llamada-binance/llamada-binance.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentePruebaComponent,
    LlamadaBinanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
