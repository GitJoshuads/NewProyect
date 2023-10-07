import { Component, OnInit } from '@angular/core';
import { CryptoPriceService } from '../../crypto-price.service';


  
  @Component({
    selector: 'app-llamada-binance',
    templateUrl: './llamada-binance.component.html',
    styleUrls: ['./llamada-binance.component.scss']
  })
  export class LlamadaBinanceComponent implements OnInit {
    cryptoData: any[] = [];
  
    constructor(private cryptoPriceService: CryptoPriceService) {}
  
    ngOnInit(): void {
      this.getCryptoPrices();
    }
  
    getCryptoPrices(): void {
      this.cryptoPriceService.getCryptoPrices().subscribe((data) => {
        this.cryptoData = data;
      });
    }
  }
