import { Component, Input } from '@angular/core';
interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent {
  @Input() dataPopupEditCrypto:any;
  constructor(){}
  selectedValue:any;
  selectedCar:any;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  ngOnInit():void{
    console.log(this.dataPopupEditCrypto + "prueba");
  }
}
