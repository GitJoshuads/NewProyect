import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http' ; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LlamadaBinanceComponent } from './components/llamada-binance/llamada-binance.component';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';
import { PopupEditCryptoComponent } from './components/popup-edit-crypto/popup-edit-crypto.component';


@NgModule({
  declarations: [
    AppComponent,
    LlamadaBinanceComponent,
    InputComponent,
    ButtonComponent,
    PopupComponent,
    PopupEditCryptoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
