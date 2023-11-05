import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-edit-crypto',
  templateUrl: './popup-edit-crypto.component.html',
  styleUrls: ['./popup-edit-crypto.component.scss']
})
export class PopupEditCryptoComponent implements OnInit{
  inputdata:any;
  eventInputAmountEdit:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref: MatDialogRef<PopupEditCryptoComponent>){

  }
  ngOnInit():void{
    this.inputdata = this.data.dataCrypto;
  }
  handleChildEventInputAmountEdit(evt: any) {
    this.eventInputAmountEdit = evt;
  }
closepopup(){
  this.ref.close(false);
}
editpopup(data:string){
  if(this.eventInputAmountEdit){
  this.ref.close({dataCrypto: data, edit: this.eventInputAmountEdit});
  }
}
}
