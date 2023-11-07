import { Component, OnInit, Type } from '@angular/core';
import { CryptoPriceService } from '../../crypto-price.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { PopupEditCryptoComponent } from '../popup-edit-crypto/popup-edit-crypto.component';



@Component({
  selector: 'app-llamada-binance',
  templateUrl: './llamada-binance.component.html',
  styleUrls: ['./llamada-binance.component.scss'],

})
export class LlamadaBinanceComponent implements OnInit {
  cryptoData: any[] = [];
  listCrypto: any[] = [] ;
  listCryptoTotal: number = 0;
  nombreRecuperado: string = '';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','delete'];
  dataSource = this.listCrypto;
  constructor(private cryptoPriceService: CryptoPriceService, public dialog: MatDialog) {

  }
  listEvent: any[] = [];
  eventInputPr: string = '';
  eventInputCom: string = '';
  eventInputAmout: number = 0;
  totalAmout: number = 0;

  ngOnInit(): void {
    localStorage.getItem('criptomonedas') ? this.listCrypto = JSON.parse(localStorage.getItem('criptomonedas') || '') : '';
    this.dataSource = this.listCrypto;
    this.getCryptoPrices();
    setInterval(()=> this.recharge(), 10000);
  }

  handleChildEvent() {
    if (this.eventInputPr && this.eventInputCom && this.eventInputAmout) {
      this.savedContentChecker()
    }
  }
  handleChildEventInputAmount(evt: any) {
    this.eventInputAmout = parseInt(evt);
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
    this.listCrypto.forEach((element)=>{
      this.cryptoData.forEach((elemen)=>{
        let amountC= 0;
        if(element.symbol === elemen.symbol){
          element['dataAmount'].forEach((total:any)=>{
            amountC = total.amount + amountC;
          });
          element.amount = amountC;
          element.price = elemen.price;
          element.dolares = elemen.price * element.amount;
          this.totalAmout = this.totalAmout + (elemen.price * element.amount); 
        }
      });
    });
    this.dataSource = this.listCrypto;
  }

  savedLocalStorage(){
    this.dataSource = this.listCrypto;
    localStorage.setItem('criptomonedas', JSON.stringify(this.listCrypto));
  }

  loopCryptocurrencyArray() {
    this.cryptoData.forEach((elemento, indice, arreglo) => {
      if (elemento.symbol === (this.eventInputPr + this.eventInputCom)) {
        this.totalAmout = (elemento.price * this.eventInputAmout) + this.totalAmout;
  
        this.listCrypto.push({ 'price': elemento.price, 'symbol': elemento.symbol, 'amount': this.eventInputAmout, 'dolares': (elemento.price * this.eventInputAmout), dataAmount:[{location:'OTRO', amount: this.eventInputAmout}] });
        //this.dataSource = this.listCrypto;
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

  savedContentChecker(): void {
    let contador = true;
    this.listCrypto.forEach((element) => {
      if (this.eventInputPr + this.eventInputCom === element.symbol) {
        contador = false;
      }
    });
    if (contador) {
      this.contentChecker();
    }
  }
  editAmountCrypto(item:any){
    this.listCrypto.forEach(list=>{
      if(list.symbol === item.dataCrypto.symbol){
        list.amount = item.edit;
        if(list && list.dataAmount){
        list['dataAmount'].forEach((locationD:any)=>{
          if(locationD.location === item.dataEdit.symbol.location){
            locationD.amount = item.dataEdit.edit;
          }
        });
      }
      }
    });
    this.savedLocalStorage();
  }

  deleteCard(event: any){
    let deleteCard = this.listCrypto.filter((element)=>{
      if(event !== element.symbol){
        return element
      }
    });
    this.listCrypto = deleteCard;
    //this.dataSource = this.listCrypto;
    this.savedLocalStorage();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, symbol: string): void {
    let _popup = this.dialog.open(PopupComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        title: symbol,
      }
    });
    _popup.afterClosed().subscribe(item => {
      if(item !== false){
        this.deleteCard(item);
      }
    })
  }
  createNewLocation(item:any){
    this.listCrypto.forEach(list=>{
      if(list.symbol === item.symbol){
        if(list && list.dataAmount){
        list['dataAmount'].push({location: item.newLocation, amount: item.newAmount})
      }
      }
    });
    this.savedLocalStorage();
  }

  openDialogEdit(dataCrypto: string){
    let _popup = this.dialog.open(PopupEditCryptoComponent, {
      width: '600px',
      height:'300px',
      data:{
        dataCrypto: dataCrypto,
      }
    });
    _popup.afterClosed().subscribe(item => {
       if(item !== false && item && item.dataEdit){
        this.editAmountCrypto(item);
      } 
      
    })
    _popup.componentInstance.childEvent.subscribe((data)=>{
      this.createNewLocation(data);
    });

  
  }
}

