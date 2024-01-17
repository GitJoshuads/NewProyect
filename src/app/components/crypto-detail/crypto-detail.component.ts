import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-crypto-detail',
  templateUrl: './crypto-detail.component.html',
  styleUrls: ['./crypto-detail.component.scss']
})
export class CryptoDetailComponent implements OnInit{
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}
  symbol: any= "BTCUSDT"; 
  url: string= '';
  safeTradingViewUrl: any='';
  ngOnInit() {
    this.route.paramMap.subscribe((params:any) => {
      this.symbol = params.params['symbol'];

      this.url= `https://s.tradingview.com/widgetembed/?symbol=BINANCE:${this.symbol}&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=light&style=1&timezone=Etc%2FUTC&withdateranges=1&showpopupbutton=1&studies_overrides=%7B%7D&overrides=%7B%7D`;
      this.safeTradingViewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
      // Hacer algo con el valor de id
);
  }
  handleChildEventInputExitAmount(data:object){

    console.log(data);

  }
}
