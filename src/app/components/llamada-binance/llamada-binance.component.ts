import { Component, OnInit, Type } from '@angular/core';
import { CryptoPriceService } from '../../crypto-price.service';



@Component({
  selector: 'app-llamada-binance',
  templateUrl: './llamada-binance.component.html',
  styleUrls: ['./llamada-binance.component.scss']
})
export class LlamadaBinanceComponent implements OnInit {
  cryptoData: any[] = [];
  listCrypto: any[] = [];
  nombreRecuperado: string = '';
  constructor(private cryptoPriceService: CryptoPriceService) {

  }
  listEvent: any[] = [];
  eventInputPr: string = '';
  eventInputCom: string = '';

  ngOnInit(): void {
    localStorage.getItem('criptomonedas')? this.listEvent = JSON.parse(localStorage.getItem('criptomonedas') ||''): '';
    //this.listEvent = JSON.parse(localStorage.getItem('criptomonedas') || '') ;
    this.getCryptoPrices();

  }

  getCryptoPrices(): void {
    this.cryptoPriceService.getCryptoPrices().subscribe((data) => {
      this.cryptoData = data;
      this.loopCryptocurrencyArray();
    });
  }

  loopCryptocurrencyArray() {
    this.listCrypto = [];
    this.cryptoData.forEach((elemento, indice, arreglo) => {
      this.listEvent.forEach((element) => {
        if (elemento.symbol === (element.criptomonedapr + element.criptomonedacom)) {
          this.listCrypto.push(elemento);
        }
      });
    });
  }
  contentChecker(){
    this.cryptoData.forEach((elemento) => {
      if(elemento.symbol === this.eventInputPr + this.eventInputCom){
        this.listEvent.push({ 'criptomonedapr': this.eventInputPr, 'criptomonedacom': this.eventInputCom });
        localStorage.setItem('criptomonedas', JSON.stringify(this.listEvent));
        this.loopCryptocurrencyArray();
      }
    });
  }
  savedContentChecker(){
    let contador = true;
    this.listEvent.forEach((element)=>{
      if(this.eventInputPr + this.eventInputCom === element.criptomonedapr + element.criptomonedacom){
        contador = false;
      }
    });
    if(contador){
      this.contentChecker();
    }
  }
  handleChildEvent() {
    if (this.eventInputPr && this.eventInputCom) {
      this.savedContentChecker()
    }
  }
  handleChildEventInputCom(evt: any) {
    this.eventInputCom = evt;
  }
  handleChildEventInputPr(evt: any) {
    this.eventInputPr = evt;
  }
}
