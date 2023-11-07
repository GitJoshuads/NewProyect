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

  onInputChange(){
   this.childEvent.emit(this.selectedValue);
  }
  ngOnInit():void{
    console.log(this.dataPopupEditCrypto);
    this.selectedValue = this.dataPopupEditCrypto['dataCrypto']['dataAmount'][0];
  }
}
