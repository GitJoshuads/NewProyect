import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CryptoPriceService } from '../../crypto-price.service';
import { CryptoPriceServiceCoinmarketcap } from '../../crypto-price-coinmarketcap.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { PopupEditCryptoComponent } from '../popup-edit-crypto/popup-edit-crypto.component';
import { cloneDeep } from 'lodash';
import { PopupCreateCryptoComponent } from '../popup-create-crypto/popup-create-crypto.component';
import { ObservableService } from '../../observable.service'

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
  displayedColumns: string[] = ['caprank','position', 'name', 'price1', 'price24', 'price7', 'capmercado', 'weight', 'symbol', 'delete'];
  dataSource = this.listCrypto;
  single: any[] = [];
  listEvent: any[] = [];
  eventInputPr: string = '';
  eventInputCom: string = 'USDT';
  eventInputAmout: number = 0;
  totalAmount: number = 0;
  totalAmountPrev: number = 0;
  totalBTC: number = 0;
  priceBTC: number = 0;
  cryptoNameMap: { [key: string]: string } = {};
  lastUpdateDate: Date | null = null;
  sortByAs: boolean = false;
  mensaje: object = {};

  constructor(
    private cryptoPriceService: CryptoPriceService,
    private cryptoPriceServiceCoinmarketcap: CryptoPriceServiceCoinmarketcap,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private observableService: ObservableService
  ) {}

  handleChildEventInputPr(evt: any) {
    this.eventInputPr = evt;
  }

  handleChildEventInputCom(evt: any) {
    this.eventInputCom = evt;
  }

  handleChildEventInputAmount(evt: any) {
    this.eventInputAmout = parseFloat(evt);
  }

  handleChildEvent() {
    if (this.eventInputPr && this.eventInputCom && this.eventInputAmout) {
      this.savedContentChecker();
    }
  }

  async ngOnInit(): Promise<void> {
    this.loadFromLocalStorage();
    await this.checkAndUpdateData();
    setInterval(() => this.recharge(), 10000);
    setInterval(()=> this.rechargeCoingecko(),200000);
    this.observableService.miObservable$.subscribe((valor) => {
      this.createinformation(valor);
    });
  }
  
  createinformation(data:any){
    this.listCrypto.forEach(valor=>{
      if(valor.symbol + 'USDT' === data.symbol){
        valor.information = data;
      }
    });
    this.savedLocalStorage();
  }

  loadFromLocalStorage(): void {
    const storedData = localStorage.getItem('criptomonedas');
    try {
      const parsedData = storedData ? JSON.parse(storedData) : null;
      this.lastUpdateDate = parsedData ? new Date(parsedData.lastUpdateDate) : null;
      this.listCrypto = parsedData ? parsedData.listCrypto || [] : [];
      this.sortArrayGraph(this.listCrypto,'dolares');
      this.dataSource = this.listCrypto;
    } catch (error) {
      console.error('Error al analizar datos almacenados:', error);
    }

    const storedDataGecko = localStorage.getItem('dataGecko');
    try {
      this.cryptoDataCoinmarketcap = storedDataGecko ? JSON.parse(storedDataGecko) : null;
      //this.mapCryptoPricesCoingecko();
    } catch (error) {
      console.error('Error al analizar datosGecko almacenados:', error);
    }
  }

  checkAndUpdateData(): void {
    if (!this.lastUpdateDate || this.isOneDayPassed(this.lastUpdateDate)) {
      this.lastUpdateDate = new Date();
      Promise.all([this.recharge(), this.rechargeCoingecko()]).then(() => {
        this.savedLocalStorage();
      });
    }else{
      this.recharge();
    }
  }

  isOneDayPassed(lastUpdate: Date): boolean {
    const today = new Date();
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    return today.getTime() - lastUpdate.getTime() > oneDayInMillis;
  }

  async recharge(): Promise<void> {
    await this.getCryptoPrices();
    this.totalAmountPrev = cloneDeep(parseFloat(this.totalAmount.toFixed(2)));
    this.totalAmount = 0;
    this.listCrypto.forEach((element) => {
      this.cryptoData.forEach((elemen) => {
        this.priceBTC = elemen.symbol === 'BTCUSDT' ? elemen.price : this.priceBTC;
        let amountC = element.dataAmount.reduce((total: number, data: any) => total + data.value, 0);
        if (element.symbol + 'USDT' === elemen.symbol) {
          element.amount = amountC;
          element.pricePrev = cloneDeep(element.price);
          element.price = elemen.price;
          element.dolares = elemen.price * element.amount;
          this.single = this.listCrypto.map((item: any) => ({ name: item.symbol, value: item.dolares }));
        }
      });
    });
    this.dataSource = this.listCrypto;
    this.calculateTotal();
  }
   
  orderbyUsdt(){
    this.sortByAs = this.sortByAs === true? false : true;
    this.sortArrayGraph(this.listCrypto,'dolares');
  }

  orderBy7d(){
    this.sortByAs = this.sortByAs === true? false : true;
    this.sortArrayGraph(this.listCrypto,'price7d');
  }

  orderBy24h(){
    this.sortByAs = this.sortByAs === true? false : true;
    this.sortArrayGraph(this.listCrypto,'price24h');
  }

  orderBy1h(){
    this.sortByAs = this.sortByAs === true? false : true;
    this.sortArrayGraph(this.listCrypto,'price1h');
  }
  orderByRank(){
    this.sortByAs = this.sortByAs === true? false : true;
    this.sortArrayGraph(this.listCrypto,'market_cap');
  }

  sortArrayGraph(data: any[], sortBy:any): void {
    //this.sortByAs = true;
    let comparacion = 0;
    data.sort((a: any, b: any) => {
      if (a[sortBy] < b[sortBy]) {
        comparacion = -1;  // Indica que 'b' debe ir antes que 'a'
      } else if (a[sortBy] > b[sortBy]) {
        comparacion = 1;  // Indica que 'a' debe ir antes que 'b'
      } 
      return this.sortByAs ? comparacion : comparacion * -1;
  });
  }

  calculateTotal(){
    this.listCrypto.forEach((element) => {
      element.dolares = element.price * element.amount;
      this.totalAmount += element.dolares;
      this.totalBTC = (this.totalAmount * 1) / this.priceBTC;
      this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
    });
  }

  async rechargeCoingecko(): Promise<void> {
    await this.getCryptoPricesCoingecko();
    this.mapCryptoPricesCoingecko();
  }

  async getCryptoPrices(): Promise<void> {
    try {
      const data:any = await this.cryptoPriceService.getCryptoPrices().toPromise();
      this.cryptoData = data;
    } catch (error:any) {
      console.error('Error al obtener datos de criptomonedas', error.message);
    }
  }

  async getCryptoPricesCoingecko(): Promise<void> {
    try {
      const data = await this.cryptoPriceServiceCoinmarketcap.getCryptoData().toPromise();
      this.cryptoDataCoinmarketcap = data;
      localStorage.setItem('dataGecko', JSON.stringify(this.cryptoDataCoinmarketcap));
    } catch (error:any) {
      console.error('Error al obtener datos de Coinmarketcap', error.message);
    }
  }

  async mapCryptoPricesCoingecko(): Promise<void> {
    this.listCrypto.forEach((element) => {
      this.cryptoDataCoinmarketcap.forEach((elemento) => {
        if (element.symbol === elemento.symbol.toUpperCase()) {
          element.price = elemento.current_price;
          element.market_cap_rank = elemento.market_cap_rank;
          element.market_cap = elemento.market_cap;
          element.price1h = parseFloat(elemento.price_change_percentage_1h_in_currency.toFixed(1));
          element.price24h = parseFloat(elemento.price_change_percentage_24h_in_currency.toFixed(1));
          element.price7d = parseFloat(elemento.price_change_percentage_7d_in_currency.toFixed(1));
        }
      });
    });
    this.savedLocalStorage();
  }

  savedLocalStorage(): void {
    const dataToStore = { lastUpdateDate: this.lastUpdateDate, listCrypto: this.listCrypto };
    localStorage.setItem('criptomonedas', JSON.stringify(dataToStore));
  }

  contentChecker(): void {
    let found = false;

    this.cryptoData.forEach((elementoSaved) => {
      if (elementoSaved.symbol === this.eventInputPr + this.eventInputCom) {
        this.contentCheckerGecko(elementoSaved);
        found = true;
      }
    });
  
    if (!found) {
      // Si no se encontró ninguna coincidencia en cryptoData, llamar a contentCheckerGecko con la concatenación de eventInputPr y eventInputCom
      let contardor = this.listCrypto.length;
      this.contentCheckerGecko(this.eventInputPr + this.eventInputCom);
      if(contardor === this.listCrypto.length){
        this.openDialogCreate(this.eventInputPr, this.eventInputAmout);
      }
    }
    this.cdr.detectChanges();
    this.recharge();
    this.savedLocalStorage();
  }

  contentCheckerGecko(elementoSaved:any){
    this.cryptoDataCoinmarketcap.forEach((elemento) => {
      if ((elementoSaved.symbol || elementoSaved)  === (elemento.symbol + 'usdt').toUpperCase()) {
        this.listCrypto.push({
          'price': elementoSaved.price || elemento.current_price,
          'amount': this.eventInputAmout,
          'dolares': ((elementoSaved.price || elemento.current_price) * this.eventInputAmout),
          'image' : elemento.image,
          'name' : elemento.name,
          'symbol' : elemento.symbol.toUpperCase(),
          'symbolC' : (elemento.symbol + 'USDT').toUpperCase(),
          'market_cap_rank' : elemento.market_cap_rank,
          'market_cap' : elemento.market_cap,
          'price1h' : elemento.price_change_percentage_1h_in_currency.toFixed(1),
          'price24h' : elemento.price_change_percentage_24h_in_currency.toFixed(1),
          'price7d' : elemento.price_change_percentage_7d_in_currency != null?elemento.price_change_percentage_7d_in_currency.toFixed(1):'', 
          dataAmount: [{ name: 'OTRO', value: this.eventInputAmout }]
        });
        this.totalAmount = parseFloat((((elementoSaved.price || elemento.current_price) * this.eventInputAmout) + this.totalAmount).toFixed(2));
      }
    });
  }

  savedContentChecker(): void {
    let contador = true;
    this.listCrypto.forEach((element) => {
      if (this.eventInputPr + this.eventInputCom === element.symbol + this.eventInputCom) {
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
              if(list.market_cap_rank === 'X'){
                list.dolares = item.dataEdit.editPrice * item.dataEdit.edit;
                list.price = item.dataEdit.editPrice;
              }
            }
            list.amount += locationD.value;
          });
        }
      }
    });
    this.savedLocalStorage();
  }

  createNewCryptoNotFound(item: any): void {
    this.listCrypto.push({
      "symbol": item.symbol,
      "price": item.total,
      "amount": item.newAmount,
      "dolares": item.total * item.newAmount,
      "dataAmount": [
        {
          "name": item.newLocation,
          "value": item.newAmount
        }
      ],
      "image": "https://assets.coingecko.com/coins/images/17233/large/immutableX-symbol-BLK-RGB.png?1696516787",
      "market_cap_rank":'X',
      "market_cap": 0,
      "price1h": "0",
      "price24h": "0",
      "price7d": "0",
      "name": item.name

    });
    this.totalAmount = parseFloat(((item.total * item.newAmount) + this.totalAmount).toFixed(2));
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
  
  formatearNumero(numero: number): string {
    if(typeof numero === 'number'){
      const partes = numero.toFixed(2).toString().split('.');
      partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return partes.join(',');
    }else{
      return numero;
    }

  }

  openDialogEdit(dataCrypto: string): void {
    let _popup = this.dialog.open(PopupEditCryptoComponent, {
      width: '900px',
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

  openDialogCreate(dataCrypto: any, amount: any): void {
    let _popup = this.dialog.open(PopupCreateCryptoComponent, {
      width: '450px',
      height: '350px',
      data: {
        dataCrypto: dataCrypto, amount,
      }
    });
    _popup.afterClosed().subscribe(item => {
      if (item && item.dataEdit && item.dataEdit.edit) {
        this.createNewCryptoNotFound(item);
      }
    })
    _popup.componentInstance.childEvent.subscribe((data) => {
      this.createNewCryptoNotFound(data);
    });
  }
}
