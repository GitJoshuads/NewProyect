import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-airdrops',
  templateUrl: './airdrops.component.html',
  styleUrls: ['./airdrops.component.scss']
})
export class AirdropsComponent implements OnInit {
  storedDataAirdrop: any;
  selectedValue: boolean;
  constructor() {
    this.selectedValue = true;
   }
  ngOnInit(): void {
    const storedData = localStorage.getItem('airdrops');
    try {
      this.storedDataAirdrop = storedData ? JSON.parse(storedData) : undefined;
      this.selectedValue = this.storedDataAirdrop? true : false;
    } catch (error) {
      console.error('Error al analizar datos almacenados:', error);
    }
  }
  checkCreateOrList(data:any){
    this.selectedValue = data == 'true'? false: true;
  }

}
