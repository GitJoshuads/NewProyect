import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Output() childEvent = new EventEmitter<string>();
  constructor() {}
  onClick(){
    this.childEvent.emit('click');
  }
}
