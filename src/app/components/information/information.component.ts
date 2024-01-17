import { Component } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  inputEnterPrice: any;
  inputEnterAmount: any;
  inputExitPrice: any;
  inputExitAmount: any;

  handleChildEventInputEnterPrice(data:any){
    this.inputEnterPrice = data;
  }
  handleChildEventInputEnterAmount(data:any){
    this.inputEnterAmount = data;
  }
  handleChildEventInputExitPrice(data:any){
    this.inputExitPrice = data;
  }
  handleChildEventInputExitAmount(data:any){
    this.inputExitAmount = data;
  }
  handleChildEventInputLocationNew(data:any){

  }
  createInformation(){
    
  }
}
