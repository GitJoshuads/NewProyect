
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.component.html',
  styleUrls: ['./wallet-detail.component.scss']
})
export class WalletDetailComponent {
  @Input() cryptoData: any;

  groupedCryptoData: any;
  prueba:any;

  constructor() { }

  ngOnChanges() {
    if (this.cryptoData) {
      this.groupedCryptoData = this.groupCryptoData();
    }
  }

  groupCryptoData(): { name: string, cryptoList: any[], showList: boolean }[] {
    const groupedData: { [key: string]: any[] } = {};

    this.cryptoData.forEach((crypto:any) => {
      this.prueba = {...crypto};
      crypto.dataAmount.forEach((data:any) => {
        const groupName = data.name || 'Other';
        if (!groupedData[groupName]) {
          groupedData[groupName] = [];
        }
        groupedData[groupName].push({image: this.prueba.image, name: this.prueba.name, amount: data.value, dolares:this.prueba.price * data.value});
      });
    });

    return Object.keys(groupedData).map(key => ({
      name: key,
      cryptoList: groupedData[key],
      showList: false
    }));
  }

  calculateTotal(cryptoList: any[]): number {
    return (cryptoList.reduce((total, crypto) => total + crypto.dolares, 0)).toFixed(2);
  }

  toggleList(group: any): void {
    group.showList = !group.showList;
  }
}
