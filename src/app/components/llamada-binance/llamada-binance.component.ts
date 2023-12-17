import { Component, OnInit } from '@angular/core';
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
  displayedColumns: string[] = ['position', 'name', 'price1', 'price24', 'price7', 'weight', 'symbol', 'delete'];
  dataSource = this.listCrypto;
  single: any[] = [];

  constructor(
    private cryptoPriceService: CryptoPriceService,
    private cryptoPriceServiceCoinmarketcap: CryptoPriceServiceCoinmarketcap,
    public dialog: MatDialog
  ) {}

  listEvent: any[] = [];
  eventInputPr: string = '';
  eventInputCom: string = '';
  eventInputAmout: number = 0;
  totalAmout: number = 0;
  totalBTC: number = 0;
  priceBTC: number = 0;
  cryptoNameMap: { [key: string]: string } = {};

  handleChildEventInputPr(evt: any) {
    this.eventInputPr = evt;
  }

  handleChildEventInputCom(evt: any) {
    this.eventInputCom = evt;
  }

  handleChildEventInputAmount(evt: any) {
    this.eventInputAmout = parseInt(evt);
  }

  handleChildEvent() {
    if (this.eventInputPr && this.eventInputCom && this.eventInputAmout) {
      this.savedContentChecker();
    }
  }

  async ngOnInit(): Promise<void> {
    localStorage.getItem('criptomonedas')
      ? (this.listCrypto = JSON.parse(localStorage.getItem('criptomonedas') || ''))
      : '';
    await this.recharge();
    await this.rechargeCoingecko();
    this.dataSource = this.listCrypto;
    this.single = this.listCrypto.map((item: any) => ({ name: item.symbol, value: item.dolares }));
    this.sortArrayGraph(this.listCrypto);
    this.sortArrayGraph(this.single);
    setInterval(() => this.recharge(), 10000);
    //setInterval(() => this.rechargeCoingecko(), 30000);
  }

  async recharge(): Promise<void> {
    await this.getCryptoPrices();
    this.totalAmout = 0;
    this.listCrypto.forEach((element) => {
      this.cryptoData.forEach((elemen) => {
        this.priceBTC = elemen.symbol === 'BTCUSDT' ? elemen.price : this.priceBTC;
        let amountC = element.dataAmount.reduce((total: number, data: any) => total + data.value, 0);
        if (element.symbol === elemen.symbol) {
          element.amount = amountC;
          element.price = elemen.price;
          element.dolares = elemen.price * element.amount;
          this.totalAmout += elemen.price * element.amount;
          this.single = this.listCrypto.map((item: any) => ({ name: item.symbol, value: item.dolares }));
        }
      });
    });
    this.sortArrayGraph(this.listCrypto);
    this.sortArrayGraph(this.single);
    this.dataSource = this.listCrypto;
    this.totalBTC = (this.totalAmout * 1) / this.priceBTC;
    this.totalAmout = parseFloat(this.totalAmout.toFixed(2));
  }

  async rechargeCoingecko(): Promise<void> {
    await this.getCryptoPricesCoinmarketcap();
    this.getCryptoPricesCoingecko();
  }

  async getCryptoPrices(): Promise<void> {
    try {
      const data:any = await this.cryptoPriceService.getCryptoPrices().toPromise();
      this.cryptoData = data;
    } catch (error:any) {
      console.error('Error al obtener datos de criptomonedas', error.message);
    }
  }

  async getCryptoPricesCoinmarketcap(): Promise<void> {
    try {
      const data = await this.cryptoPriceServiceCoinmarketcap.getCryptoData().toPromise();
      this.cryptoDataCoinmarketcap = data;
    } catch (error:any) {
      console.error('Error al obtener datos de Coinmarketcap', error.message);
    }
  }

  async getCryptoPricesCoingecko(): Promise<void> {
    this.listCrypto.forEach((element) => {
      this.cryptoDataCoinmarketcap.forEach((elemento) => {
        if (element.symbol === (elemento.symbol + 'usdt').toUpperCase()) {
          element.price1h = elemento.price_change_percentage_1h_in_currency.toFixed(1);
          element.price24h = elemento.price_change_percentage_24h_in_currency.toFixed(1);
          element.price7d = elemento.price_change_percentage_7d_in_currency.toFixed(1);
        }
      });
    });
  }

  sortArrayGraph(data: any[]): void {
    data.sort((a: any, b: any) => (b.value || b.dolares) - (a.value || a.dolares));
  }

  savedLocalStorage(): void {
    this.dataSource = this.listCrypto;
    localStorage.setItem('criptomonedas', JSON.stringify(this.listCrypto));
  }

  loopCryptocurrencyArray(): void {
    this.cryptoData.forEach((elemento, indice, arreglo) => {
      if (elemento.symbol === this.eventInputPr + this.eventInputCom) {
        this.totalAmout = parseFloat(((elemento.price * this.eventInputAmout) + this.totalAmout).toFixed(2));

        this.listCrypto.push({
          'price': elemento.price,
          'symbol': elemento.symbol,
          'amount': this.eventInputAmout,
          'dolares': (elemento.price * this.eventInputAmout),
          dataAmount: [{ name: 'OTRO', value: this.eventInputAmout }]
        });
        this.savedLocalStorage();
      }
    });
  }

  contentChecker(): void {
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

  editAmountCrypto(item: any): void {
    this.listCrypto.forEach(list => {
      if (list.symbol === item.dataCrypto.symbol) {
        list.amount = 0;
        if (list && list.dataAmount) {
          list['dataAmount'].forEach((locationD: any) => {
            if (locationD.name === item.dataEdit.symbol.name) {
              locationD.value = item.dataEdit.edit;
            }
            list.amount += locationD.value;
          });
        }
      }
    });
    this.savedLocalStorage();
  }

  deleteLocationAmountCrypto(item: any): void {
    this.listCrypto.forEach(list => {
      if (list.symbol === item.dataCrypto.symbol) {
        if (list && list.dataAmount) {
          list.amount -= item.dataEdit.symbol.value;
          let index = list['dataAmount'].findIndex((objeto: any) => objeto.name === item.dataEdit.symbol.name);
          list['dataAmount'].splice(index, 1);
        }
      }
    });

    this.savedLocalStorage();
  }

  deleteCard(event: any): void {
    this.listCrypto = this.listCrypto.filter((element) => event !== element.symbol);
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

  createNewLocation(item: any): void {
    this.listCrypto.forEach(list => {
      if (list.symbol === item.symbol) {
        if (list && list.dataAmount) {
          list['dataAmount'].push({ name: item.newLocation, value: item.newAmount })
        }
      }
    });
    this.savedLocalStorage();
  }

  openDialogEdit(dataCrypto: string): void {
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
