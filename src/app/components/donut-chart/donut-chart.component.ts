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
  view: [number, number] = [1000, 200];

  // options
  
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ["#1f78b4", "#33a02c", "#e31a1c", "#ff7f00", "#6a3d9a",
    "#a6cee3", "#b2df8a", "#fb9a99", "#fdbf6f", "#cab2d6",
    "#01665e", "#8c510a", "#35978f", "#c51b7d", "#b2182b",
    "#084594", "#41ab5d", "#67001f", "#8c6bb1", "#8e0152",
    "#3182bd", "#006837", "#fa9fb5", "#fec44f", "#d73027",
    "#084594", "#8856a7", "#41ab5d", "#d73027", "#313695",
    "#fdae61", "#fee08b", "#d73027", "#4575b4", "#313695",
    "#fee08b", "#4575b4", "#313695", "#fee08b", "#4575b4",
    "#313695", "#fee08b", "#4575b4", "#313695", "#fee08b",
    "#4575b4", "#313695", "#fee08b", "#4575b4", "#313695"]
  };

  constructor() {
   
  }
  ngOnInit(): void {
  }

  onSelect(data:any): void {
  }

  onActivate(data:any): void {
  }

  onDeactivate(data:any): void {
  }
}
