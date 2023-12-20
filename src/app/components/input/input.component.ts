import { Component, Output , EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent {
  @Output() childEvent = new EventEmitter<string>();
  @Input() placeholder:any;

  inputValue: string = '';
  constructor() {}
  
  ngOnInit(){
    //console.log(this.placeholder + "placeholder")
  }
  onInput(event: any): void {
    // Convierte a mayúsculas si es una cadena
    if (typeof this.inputValue === 'string') {
      this.inputValue = this.inputValue.toUpperCase();
    }
  }
  onKeyPress(event: any): void {
    const inputChar = String.fromCharCode(event.charCode);
    if(this.placeholder.type === 'number'){
      // Verifica si el carácter presionado es un dígito
      if (!/^\d*$/.test(inputChar)) {
        event.preventDefault();
      }
    }else{
      // Verifica si la tecla presionada es una letra
      if (!/^[a-zA-Z]*$/.test(inputChar)) {
        event.preventDefault();
      }
    }
  }
  onInputChange(){
   console.log(this.inputValue)
   this.childEvent.emit(this.inputValue);
  }
}





 