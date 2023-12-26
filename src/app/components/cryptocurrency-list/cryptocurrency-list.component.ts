import { Component, OnInit } from '@angular/core';
import { CryptoPriceService } from '../../crypto-price.service';
import { CryptoPriceServiceCoinmarketcap } from '../../crypto-price-coinmarketcap.service';

@Component({
  selector: 'app-cryptocurrency-list',
  templateUrl: './cryptocurrency-list.component.html',
  styleUrls: ['./cryptocurrency-list.component.scss']
})
export class CryptocurrencyListComponent implements OnInit {
  cryptoData: any[] = [];
  dataCoingecko: any[] = [];
  constructor(private cryptoPriceService: CryptoPriceService, private cryptoPriceServiceCoinmarketcap: CryptoPriceServiceCoinmarketcap) { }

  ngOnInit(): void {
    this.getCryptoPrices();
    this.getCryptoPricesCoingecko();
  }

  async getCryptoPrices(): Promise<void> {
    try {
      const data: any = await this.cryptoPriceService.getCryptoPrices().toPromise();
      this.cryptoData = data;
    } catch (error: any) {
      console.error('Error al obtener datos de criptomonedasBNB', error.message);
    }
  }
  async getCryptoPricesCoingecko() {
    try {
      const dataCoingecko: any = await this.cryptoPriceServiceCoinmarketcap.getCryptoData().toPromise();
      this.dataCoingecko = dataCoingecko;
    } catch (error: any) {
      console.error('Error al obtener datos de criptomonedasCoingecko', error.message);
    }
  }
}
