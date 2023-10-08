import { Component, Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent {
  // app-child.component.ts
  @Output() childEvent = new EventEmitter<string>();

  inputValue: string = '';
  preba:string="";
  constructor() {}
  sendDataToParent() {
    this.childEvent.emit(this.inputValue);
  }
}





 