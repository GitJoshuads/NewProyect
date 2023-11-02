import { Component, OnInit, Type } from '@angular/core';
import { CryptoPriceService } from '../../crypto-price.service';



@Component({
  selector: 'app-llamada-binance',
  templateUrl: './llamada-binance.component.html',
  styleUrls: ['./llamada-binance.component.scss']
})
export class LlamadaBinanceComponent implements OnInit {
  cryptoData: any[] = [];
  listCrypto: { total: number, crypto: any[] } = { total: 0, crypto: [] };
  nombreRecuperado: string = '';
  constructor(private cryptoPriceService: CryptoPriceService) {

  }
  listEvent: any[] = [];
  eventInputPr: string = '';
  eventInputCom: string = '';
  eventInputAmout: number = 0;
  totalAmout: number = 0;

  ngOnInit(): void {
    localStorage.getItem('criptomonedas') ? this.listCrypto = JSON.parse(localStorage.getItem('criptomonedas') || '') : '';
    this.getCryptoPrices();
    setInterval(()=> this.recharge(), 10000);
  }

  handleChildEvent() {
    if (this.eventInputPr && this.eventInputCom && this.eventInputAmout) {
      this.savedContentChecker()
    }
  }
  handleChildEventInputAmount(evt: any) {
    this.eventInputAmout = evt;
  }
  handleChildEventInputCom(evt: any) {
    this.eventInputCom = evt;
  }
  handleChildEventInputPr(evt: any) {
    this.eventInputPr = evt;
  }

  getCryptoPrices(): void {
    this.cryptoPriceService.getCryptoPrices().subscribe((data) => {
      this.cryptoData = data;
    });
  }


  recharge(){
    this.getCryptoPrices();
    this.totalAmout = 0; 
    this.listCrypto['crypto'].forEach((element)=>{
      this.cryptoData.forEach((elemen)=>{
        if(element.symbol === elemen.symbol){
          element.price = elemen.price;
          element.dolares = elemen.price * element.amount;
          this.totalAmout = this.totalAmout + (elemen.price * element.amount); 
        }
      });
    });
  }
  deleteCard(event: any){
    let deleteCard = this.listCrypto['crypto'].filter((element)=>{
      if(event !== element.symbol){
        return element
      }
    });
    this.listCrypto['crypto'] = deleteCard;
    this.savedLocalStorage();
  }

  savedLocalStorage(){
    localStorage.setItem('criptomonedas', JSON.stringify(this.listCrypto));
  }

  loopCryptocurrencyArray() {
    this.cryptoData.forEach((elemento, indice, arreglo) => {
      if (elemento.symbol === (this.eventInputPr + this.eventInputCom)) {
        this.totalAmout = (elemento.price * this.eventInputAmout) + this.totalAmout;
        this.listCrypto['total'] = this.totalAmout;
        this.listCrypto['crypto'].push({ 'price': elemento.price, 'symbol': elemento.symbol, 'amount': this.eventInputAmout, 'dolares': (elemento.price * this.eventInputAmout) });
        this.savedLocalStorage();
      }
    });
  }
  contentChecker() {
    this.cryptoData.forEach((elemento) => {
      if (elemento.symbol === this.eventInputPr + this.eventInputCom) {
        this.loopCryptocurrencyArray();
      }
    });
  }
  savedContentChecker() {
    let contador = true;
    this.listCrypto['crypto'].forEach((element) => {
      if (this.eventInputPr + this.eventInputCom === element.symbol) {
        contador = false;
      }
    });
    if (contador) {
      this.contentChecker();
    }
  }
}
