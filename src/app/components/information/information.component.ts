import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ObservableService } from '../../observable.service';


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})

export class InformationComponent implements OnInit {
  @Input() symbol: string = '';
  @Output() childEvent = new EventEmitter<any>();
  
  inputEnterPrice: any;
  inputEnterAmount: any;
  inputExitPrice: any;
  inputExitAmount: any;
  lastUpdateDate: Date | null = null;
  listCrypto: any[] = [];
  cryptoDataCoinmarketcap: any[] = [];
  dataInformation: any;
  informationOrEdit: any = true;
  dataAmount:any = {};
  eventSelectLocation: any;
  selectedValue:any;
 
  constructor(private observableService: ObservableService){}

  ngOnInit(){
    this.loadFromLocalStorage();
  }

  handleChildEventInputEnterPrice(data:any){
    this.inputEnterPrice = parseFloat(data);
  }
  handleChildEventInputEnterAmount(data:any){
    this.inputEnterAmount = parseFloat(data);
  }
  handleChildEventInputExitPrice(data:any){
    this.inputExitPrice = parseFloat(data);
  }
  handleChildEventInputExitAmount(data:any){
    this.inputExitAmount = parseFloat(data);
  }
  handleChildEventInputLocationNew(data:any){

  }
  createInformation(){
    if(this.inputEnterPrice && (this.inputEnterAmount || this.eventSelectLocation.value) && this.inputExitPrice && this.inputExitAmount){
      this.observableService.emitirValor({ symbol: this.symbol, enterPrice: this.inputEnterPrice, enterAmount: (this.inputEnterAmount || this.eventSelectLocation.value), exitPrice: this.inputExitPrice, exitAmount: this.inputExitAmount });
    }else if(this.inputEnterPrice && (this.inputEnterAmount || this.eventSelectLocation.value)){
      this.observableService.emitirValor({ symbol: this.symbol, enterPrice: this.inputEnterPrice, enterAmount: (this.inputEnterAmount || this.eventSelectLocation.value) });
    } else if(this.inputExitPrice && this.inputExitAmount){
      this.observableService.emitirValor({ symbol: this.symbol, exitPrice: this.inputExitPrice, exitAmount: this.inputExitAmount });
    }
  }

  loadFromLocalStorage(): void {
    const storedData = localStorage.getItem('criptomonedas');
    try {
      const parsedData = storedData ? JSON.parse(storedData) : null;
      this.lastUpdateDate = parsedData ? new Date(parsedData.lastUpdateDate) : null;
      this.listCrypto = parsedData ? parsedData.listCrypto || [] : [];
      this.dataShow();
    } catch (error) {
      console.error('Error al analizar datos almacenados:', error);
    }
  }
  dataShow(){
    this.listCrypto.forEach(valor=>{
      if(valor.symbol + 'USDT' === this.symbol && valor.information){
        this.dataInformation = {information: valor.information, price: valor.price , calculate:(((valor.price - valor.information.enterPrice) / valor.information.enterPrice)*100).toFixed(1)};
      }
      if(valor.symbol + 'USDT' === this.symbol){
        this.dataAmount = valor.dataAmount;
        this.eventSelectLocation = valor.dataAmount[0];
      }
    });
    this.informationOrEdit = this.dataInformation && this.dataInformation.information && (this.dataInformation.information.enterAmount || this.dataInformation.information.exitAmount) ? true : false;
  }

  handleChildEventSelectLocation(evt:any){
    this.eventSelectLocation = evt;
  }

  checkEditTotal(){
    this.informationOrEdit = this.informationOrEdit === 'true' ? false : true;
  }

}
