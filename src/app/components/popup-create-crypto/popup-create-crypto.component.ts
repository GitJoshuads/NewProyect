import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-create-crypto',
  templateUrl: './popup-create-crypto.component.html',
  styleUrls: ['./popup-create-crypto.component.scss']
})
export class PopupCreateCryptoComponent {
  @Output() childEvent = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupCreateCryptoComponent>) { }
  inputdata: any;
  inputdatAmount: any;
  eventInputAmountCreate: any;
  dataPopupEditCrypto: any = this.data;
  eventSelectLocation: any='';
  eventInputAmountNew: any;
  eventInputCrypto: any;
  eventInputCryptoSymbol: any;
  selectedValue:any = true;
  prueba: any[]=[];


  ngOnInit(): void {
    this.inputdata = this.data.dataCrypto;
    this.inputdatAmount = this.data.amount;
  }

  handleChildEventInputCrypto(evt:any){
    this.eventInputCrypto = evt;
  }

  handleChildEventInputCryptoSymbol(evt:any){
    this.eventInputCryptoSymbol = evt;
  }

  handleChildEventInputLocation(evt:any){
    this.eventSelectLocation = evt;
  }

  handleChildEventInputAmount(evt: any) {
    this.eventInputAmountCreate = parseInt(evt);
  }

  handleChildEventInputTotal(evt: any) {
    this.eventInputAmountNew = parseFloat(evt);
  }
  

  closepopup() {
    this.ref.close(false);
  }

  createNewLocation(){
    if((this.eventInputCrypto || this.inputdata) && this.eventSelectLocation && (this.eventInputAmountCreate || this.inputdatAmount) && this.eventInputAmountNew && this.eventInputCryptoSymbol){
      this.childEvent.emit({symbol: this.eventInputCryptoSymbol, name: this.eventInputCrypto || this.inputdata, newLocation: this.eventSelectLocation, newAmount: this.eventInputAmountCreate || this.inputdatAmount, total: this.eventInputAmountNew});
    }
  }


  formatearNumero(numero: number): string {
    const partes = numero.toFixed(2).toString().split('.');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return partes.join(',');
  }
}
