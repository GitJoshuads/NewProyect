import { Component, Input,OnInit } from '@angular/core';
import { Color } from '@swimlane/ngx-charts';
import { ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent {
  @Input() listCrypto:any;

  single: any[]= [];
  view: [number, number] = [400, 200];

  // options
  
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  //colorScheme: { domain: string[] } = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };
  //colorScheme: string[] = ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'];
  //colorScheme = {domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']};

  constructor() {
   
  }
  ngOnInit(): void {
     this.listCrypto.forEach((item:any)=>{
      this.single.push({name:item.symbol, value:item.dolares});
    });
  }

  onSelect(data:any): void {
    console.log("----------------------------" + this.listCrypto);
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
