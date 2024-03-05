import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-airdrop',
  templateUrl: './create-airdrop.component.html',
  styleUrls: ['./create-airdrop.component.scss']
})
export class CreateAirdropComponent implements OnInit{
  cryptoVar: any;
  amoutCryptoVar: any;
  priceCrytoVar: any;
  textareaInfoVar: any = undefined;
  createInformationVar: any;
  contenidoTextarea: string = '';
  amountInversionUSDTVar: any;
  fechaVar: any;
  dataLocal:any;


  constructor(){}

  ngOnInit(): void {
    let storedData = localStorage.getItem('airdrops');
    try {
      this.dataLocal = storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error('No disponemos de airdrops');
    }
  }

  createInformation(){
    if(this.cryptoVar && this.amoutCryptoVar && this.priceCrytoVar){
      alert('entra joder');
      this.savedLocalStorage();
    }
  }

  crypto(data:any){
    this.cryptoVar = data;
  }

  amoutCrypto(data:any){
    this.amoutCryptoVar = data;
  }

  priceCryto(data:any){
    this.priceCrytoVar = data;
  }

  amountInversionUSDT(data:any){
    this.amountInversionUSDTVar = data;
  }
  fecha(data:any){
    this.fechaVar = data;
  }

  savedLocalStorage(): void {
    this.createInformationVar = { cryptomoneda: this.cryptoVar, amount: this.amoutCryptoVar, price: this.priceCrytoVar, amountInversion: this.amountInversionUSDTVar, information: this.contenidoTextarea? this.contenidoTextarea: undefined };
    this.dataLocal.push(this.createInformationVar);
    localStorage.setItem('airdrops', JSON.stringify(this.dataLocal));
  }
}
