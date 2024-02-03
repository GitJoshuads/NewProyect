import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-airdrop',
  templateUrl: './list-airdrop.component.html',
  styleUrls: ['./list-airdrop.component.scss']
})
export class ListAirdropComponent implements OnInit{
  @Input() airdrops: any;
  constructor(){}
  ngOnInit(): void {
    console.log(this.airdrops)
  }
}
