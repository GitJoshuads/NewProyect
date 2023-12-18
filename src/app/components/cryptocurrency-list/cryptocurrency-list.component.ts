import { Component, OnInit } from '@angular/core';
import { CryptoPriceService } from '../../crypto-price.service'

@Component({
  selector: 'app-cryptocurrency-list',
  templateUrl: './cryptocurrency-list.component.html',
  styleUrls: ['./cryptocurrency-list.component.scss']
})
export class CryptocurrencyListComponent implements OnInit {
  cryptoData: any[] = [];
  constructor(private cryptoPriceService: CryptoPriceService){}

  ngOnInit(): void{
    this.getCryptoPrices();
  }

  async getCryptoPrices(): Promise<void> {
    try {
      const data:any = await this.cryptoPriceService.getCryptoPrices().toPromise();
      this.cryptoData = data;
    } catch (error:any) {
      console.error('Error al obtener datos de criptomonedas', error.message);
    }
  }
}
