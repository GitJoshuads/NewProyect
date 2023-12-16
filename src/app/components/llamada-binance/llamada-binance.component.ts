import { Component, OnInit, Type } from '@angular/core';
import { CryptoPriceService } from '../../crypto-price.service';
import { CryptoPriceServiceCoinmarketcap } from '../../crypto-price-coinmarketcap.service';
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
  cryptoDataCoinmarketcap: any[] = [];
  listCrypto: any[] = [];
  listCryptoTotal: number = 0;
  nombreRecuperado: string = '';
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'delete'];
  dataSource = this.listCrypto;
  single: any[] = [];
  constructor(private cryptoPriceService: CryptoPriceService, private cryptoPriceServiceCoinmarketcap: CryptoPriceServiceCoinmarketcap, public dialog: MatDialog) {

  }
  listEvent: any[] = [];
  eventInputPr: string = '';
  eventInputCom: string = '';
  eventInputAmout: number = 0;
  totalAmout: number = 0;
  totalBTC: number = 0;
  priceBTC: number = 0;

  ngOnInit(): void {
    localStorage.getItem('criptomonedas') ? this.listCrypto = JSON.parse(localStorage.getItem('criptomonedas') || '') : '';
    this.dataSource = this.listCrypto;
    this.single = [];
    this.listCrypto.forEach((item: any) => {
      this.single.push({ name: item.symbol, value: item.dolares });
    });
    this.sortArrayGraph(this.listCrypto);
    this.sortArrayGraph(this.single);
    this.getCryptoPrices();
    this.getCryptoPricesCoinmarketcap();
    setInterval(() => this.recharge(), 10000);
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
  getCryptoPricesCoinmarketcap(): void {
    this.cryptoPriceServiceCoinmarketcap.getCryptoData().subscribe((data) => {
      this.cryptoDataCoinmarketcap = data;
    });
  }

  //Actualizador de precios 
  recharge() {
    this.getCryptoPrices();
    this.totalAmout = 0;
    //console.log('listCryptoAntesEdit' + JSON.stringify(this.listCrypto));
    this.listCrypto.forEach((element) => {
      this.cryptoData.forEach((elemen) => {
        this.priceBTC = elemen.symbol === 'BTCUSDT' ? elemen.price : this.priceBTC;
        let amountC = 0;
        if (element.symbol === elemen.symbol) {
          element['dataAmount'].forEach((total: any) => {
            amountC = total.value + amountC;
          });
          element.amount = amountC;
          element.price = elemen.price;
          element.dolares = elemen.price * element.amount;
          this.totalAmout = this.totalAmout + (elemen.price * element.amount);
          this.single = [];
          this.listCrypto.forEach((item: any) => {
            this.single.push({ name: item.symbol, value: item.dolares });
          });
          this.sortArrayGraph(this.listCrypto);
          this.sortArrayGraph(this.single);
        }
      });
    });
    //console.log('listCryptoEdit' + JSON.stringify(this.listCrypto));
    this.dataSource = this.listCrypto;
    //this.dataSource.push(...this.listCrypto);
    this.totalBTC = (this.totalAmout * 1) / this.priceBTC;
    this.totalAmout = parseFloat((this.totalAmout).toFixed(2));
  }
  //Ordenar grafica
  sortArrayGraph(data: any[]) {
    data.sort((a: any, b: any) => (b.value || b.dolares) - (a.value || a.dolares));
  }

  savedLocalStorage() {
    this.dataSource = this.listCrypto;
    localStorage.setItem('criptomonedas', JSON.stringify(this.listCrypto));
  }

  loopCryptocurrencyArray() {
    this.cryptoData.forEach((elemento, indice, arreglo) => {
      if (elemento.symbol === (this.eventInputPr + this.eventInputCom)) {
        this.totalAmout = parseFloat(((elemento.price * this.eventInputAmout) + this.totalAmout).toFixed(2));

        this.listCrypto.push({ 'price': elemento.price, 'symbol': elemento.symbol, 'amount': this.eventInputAmout, 'dolares': (elemento.price * this.eventInputAmout), dataAmount: [{ name: 'OTRO', value: this.eventInputAmout }] });
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
  editAmountCrypto(item: any) {
    this.listCrypto.forEach(list => {
      if (list.symbol === item.dataCrypto.symbol) {
        list.amount = 0;
        if (list && list.dataAmount) {
          list['dataAmount'].forEach((locationD: any) => {
            if (locationD.name === item.dataEdit.symbol.name) {
              locationD.value = item.dataEdit.edit;
            }
            list.amount = list.amount + locationD.value;
          });
        }
      }
    });
    this.savedLocalStorage();
  }
  deleteLocationAmountCrypto(item: any) {
    this.listCrypto.forEach(list => {
      if (list.symbol === item.dataCrypto.symbol) {
        if (list && list.dataAmount) {
          list.amount = list.amount - item.dataEdit.symbol.value;
          let index = list['dataAmount'].findIndex((objeto: any) => objeto.name === item.dataEdit.symbol.name);
          list['dataAmount'].splice(index, 1);
        }
      }
    });

    this.savedLocalStorage();
  }

  deleteCard(event: any) {
    let deleteCard = this.listCrypto.filter((element) => {
      if (event !== element.symbol) {
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
      data: {
        title: symbol,
      }
    });
    _popup.afterClosed().subscribe(item => {
      if (item !== false) {
        this.deleteCard(item);
      }
    })
  }
  createNewLocation(item: any) {
    this.listCrypto.forEach(list => {
      if (list.symbol === item.symbol) {
        if (list && list.dataAmount) {
          list['dataAmount'].push({ name: item.newLocation, value: item.newAmount })
        }
      }
    });
    this.savedLocalStorage();
  }

  openDialogEdit(dataCrypto: string) {
    let _popup = this.dialog.open(PopupEditCryptoComponent, {
      width: '700px',
      height: '350px',
      data: {
        dataCrypto: dataCrypto,
      }
    });
    _popup.afterClosed().subscribe(item => {
      if (item && item.dataEdit && item.dataEdit.edit) {
        this.editAmountCrypto(item);
      }
      if (item && item.dataEdit && item.dataEdit.edit === false) {
        this.deleteLocationAmountCrypto(item);
      }

    })
    _popup.componentInstance.childEvent.subscribe((data) => {
      this.createNewLocation(data);
    });


  }
}

