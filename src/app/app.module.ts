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
import {MatSelectModule} from '@angular/material/select';
import { SelectComponent } from './components/select/select.component';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CryptoDetailComponent } from './components/crypto-detail/crypto-detail.component';
import { CryptocurrencyListComponent } from './components/cryptocurrency-list/cryptocurrency-list.component';
import { FooterComponent } from './components/footer/footer.component';






@NgModule({
  declarations: [
    AppComponent,
    LlamadaBinanceComponent,
    InputComponent,
    ButtonComponent,
    PopupComponent,
    PopupEditCryptoComponent,
    SelectComponent,
    DonutChartComponent,
    CryptoDetailComponent,
    CryptocurrencyListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
