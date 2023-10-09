import { Component, Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent {
  @Output() childEvent = new EventEmitter<string>();

  inputValue: string = '';
  constructor() {}
  
  onInputChange(){
   console.log(this.inputValue)
   this.childEvent.emit(this.inputValue);
  }
}





 