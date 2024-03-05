import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-arkham',
  templateUrl: './create-arkham.component.html',
  styleUrls: ['./create-arkham.component.scss']
})
export class CreateArkhamComponent implements OnInit{
  textareaInfoVar: any = undefined;
  createInformationVar: any;
  contenidoTextarea: string = '';


  dataLocal:any;
  inputValue: string = '';


  constructor(){}

  ngOnInit(): void {
    let storedData = localStorage.getItem('arkham');
    try {
      this.dataLocal = storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error('No disponemos de airdrops');
    }
  }

  createInformation(){
    if(this.inputValue){
      alert('entra joder');
      this.savedLocalStorage();
    }
  }
  savedLocalStorage(): void {
    this.createInformationVar = { arkham: this.inputValue, description: this.contenidoTextarea? this.contenidoTextarea: undefined };
    this.dataLocal.push(this.createInformationVar);
    localStorage.setItem('arkham', JSON.stringify(this.dataLocal));
  }
}
