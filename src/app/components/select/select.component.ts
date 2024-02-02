import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent {
  @Input() dataPopupEditCrypto:any;
  @Output() childEvent = new EventEmitter<string>();
  constructor(){}
  selectedValue:any;
  dataValue:any;

  onInputChange(){
   this.childEvent.emit(this.selectedValue);
  }
  ngOnInit():void{
    if(this.dataPopupEditCrypto && this.dataPopupEditCrypto['dataCrypto']){
      this.selectedValue = this.dataPopupEditCrypto['dataCrypto']['dataAmount'][0];
      this.dataValue = this.dataPopupEditCrypto['dataCrypto']['dataAmount'];
    } else {
      this.selectedValue = this.dataPopupEditCrypto[0];
      this.dataValue = this.dataPopupEditCrypto;
    }
  }
}
