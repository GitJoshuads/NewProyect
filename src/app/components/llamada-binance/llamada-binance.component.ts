import { Component, OnInit, Type } from '@angular/core';
import { CryptoPriceService } from '../../crypto-price.service';


  
  @Component({
    selector: 'app-llamada-binance',
    templateUrl: './llamada-binance.component.html',
    styleUrls: ['./llamada-binance.component.scss']
  })
  export class LlamadaBinanceComponent implements OnInit {
    cryptoData: any[] = [];
    constructor(private cryptoPriceService: CryptoPriceService) {}
    listEvent:Array<string> = [];
  
    ngOnInit(): void {
      this.getCryptoPrices();
    }
  
    getCryptoPrices(): void {
      this.cryptoPriceService.getCryptoPrices().subscribe((data) => {
        this.cryptoData = data;
      });
    }

    handleChildEvent(evt: any){
      if(evt === 'click' && this.listEvent.length){
        alert(this.listEvent);
      } else {
        this.listEvent = evt === 'click'? '': evt;
      }
    }
  }
