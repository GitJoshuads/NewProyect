import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  inputdata:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref: MatDialogRef<PopupComponent>){

  }
  ngOnInit():void{
    this.inputdata = this.data;
  }
closepopup(){
  this.ref.close(false);
}
deletepopup(symbol:string){
  this.ref.close(symbol);
}
}
