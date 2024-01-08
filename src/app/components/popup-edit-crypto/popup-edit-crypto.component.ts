import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-edit-crypto',
  templateUrl: './popup-edit-crypto.component.html',
  styleUrls: ['./popup-edit-crypto.component.scss']
})
export class PopupEditCryptoComponent implements OnInit {
  @Output() childEvent = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupEditCryptoComponent>) { }
  inputdata: any;
  eventInputAmountEdit: any;
  dataPopupEditCrypto: any = this.data;
  eventSelectLocation: any='';
  eventInputAmountNew: any;
  eventInputLocationNew: any;
  selectedValue:any = true;
  prueba: any[]=[];

  ngOnInit(): void {
    this.inputdata = this.data.dataCrypto;
    this.prueba = this.inputdata['dataAmount'].sort((a:any,b:any)=> b.value - a.value);
    this.eventSelectLocation = this.inputdata['dataAmount'][0];
  }
  handleChildEventInputAmountEdit(evt: any) {
    this.eventInputAmountEdit = parseInt(evt);
  }
  handleChildEventSelectLocation(evt:any){
    this.eventSelectLocation = evt;
  }

  handleChildEventInputLocationNew(evt:any){
    this.eventInputLocationNew = evt;
  }
  handleChildEventInputAmountNew(evt: any) {
    this.eventInputAmountNew = parseFloat(evt);
  }
  

  closepopup() {
    this.ref.close(false);
  }
  editpopup(data: string) {
    if (this.eventInputAmountEdit) {
      this.ref.close({ dataCrypto: data, dataEdit: {edit: this.eventInputAmountEdit, symbol: this.eventSelectLocation }});
    }
  }
  deleteLocationpopup(data: string) {
    this.ref.close({ dataCrypto: data, dataEdit: {edit: false, symbol: this.eventSelectLocation }});
    
  }
  createNewLocation(evt:any){
    if(this.eventInputLocationNew && this.eventInputAmountNew){
      this.childEvent.emit({symbol: evt, newLocation: this.eventInputLocationNew, newAmount: this.eventInputAmountNew});
      this.selectedValue = true;
    }
  }
  checkEditTotal(value:string){
    this.selectedValue = value === 'true'? true : false;
  }

  formatearNumero(numero: number): string {
    const partes = numero.toFixed(2).toString().split('.');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return partes.join(',');
  }
}
