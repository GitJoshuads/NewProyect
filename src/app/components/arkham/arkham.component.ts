import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arkham',
  templateUrl: './arkham.component.html',
  styleUrls: ['./arkham.component.scss']
})
export class ArkhamComponent implements OnInit {
  storedDataAirdrop: any;
  selectedValue: boolean;
  constructor() {
    this.selectedValue = true;
   }
  ngOnInit(): void {
    const storedData = localStorage.getItem('arkham');
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
