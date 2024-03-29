import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LlamadaBinanceComponent } from './components/llamada-binance/llamada-binance.component'
import { CryptocurrencyListComponent} from './components/cryptocurrency-list/cryptocurrency-list.component';
import { CryptoDetailComponent} from './components/crypto-detail/crypto-detail.component';
import { AirdropsComponent} from './components/airdrops/airdrops.component';
import { ArkhamComponent } from './components/arkham/arkham.component';
import { HerramientasComponent } from './components/herramientas/herramientas.component';

const routes: Routes = [
  { path: '', component: CryptocurrencyListComponent },
  { path: 'about', component: LlamadaBinanceComponent },
  { path: 'detail/:symbol', component: CryptoDetailComponent },
  { path: 'airdrops', component: AirdropsComponent },
  { path: 'arkham', component: ArkhamComponent },
  { path: 'herramientas', component: HerramientasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
