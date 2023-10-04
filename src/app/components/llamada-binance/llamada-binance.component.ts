import { Component, Input, inject } from '@angular/core'; 
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-llamada-binance',
  templateUrl: './llamada-binance.component.html',
  styleUrls: ['./llamada-binance.component.scss']
})
export class LlamadaBinanceComponent {
  @Input() title: string = '';
constructor() {
  let endpoint = {
    type: String,
    
  } 
}
http = inject(HttpClient);

ngOnInit(){
  this.http.get('https://api.binance.com/api/v3/ticker/price')
  .subscribe((data: any)=>{
    console.log(data);
    const mostrarData = (data: any)=>{
      console.log(data + "data antes de entrar al for")
      let body = ''
      for (let i=0; i < data.length; i++) {
          body += `<tr><td>${data[i].symbol}</td><td>${data[i].price}</td></tr>`
      }
     // document.getElementById('data').innerHTML = body
  } 
  })
  
}

/*
LlamadaBinanceComponent.fetch(endpoint)
      .then( respuesta => respuesta.json() )
      .then( datos => mostrarData(datos))
      .catch( e => console.log(e))
  
  
  const mostrarData = (data)=>{
      //console.log(data)
      let body = ''
      for (let i=0; i < data.length; i++) {
          body += `<tr><td>${data[i].symbol}</td><td>${data[i].price}</td></tr>`
      }
      document.getElementById('data').innerHTML = body
  } 
  */   
}
