import { Component, OnInit, Input } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-arkham',
  templateUrl: './list-arkham.component.html',
  styleUrls: ['./list-arkham.component.scss']
})
export class ListArkhamComponent implements OnInit{
  @Input() airdrops: any;
  constructor(public dialog: MatDialog){}
  ngOnInit(): void {
    console.log(this.airdrops)
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, symbol: string): void {
    let _popup = this.dialog.open(PopupComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: symbol,
      }
    });
    _popup.afterClosed().subscribe(item => {
      if (item !== false) {
        this.deleteCard(item);
      }
    })
  }

  deleteCard(event: any): void {
    this.airdrops = this.airdrops.filter((element:any) => event !== element.cryptomoneda);
    this.savedLocalStorage();
  }

  savedLocalStorage(): void {
    localStorage.setItem('airdrops', JSON.stringify(this.airdrops));
  }
}

