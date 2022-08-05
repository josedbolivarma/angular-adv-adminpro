import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  // Doughnut
@Input() labels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
@Input() data: number[] = [ 100, 100, 100 ];
@Input() titulo: string = 'Compras';    

public colors: Color[] = [
  '#F70749', 
  '#660720', 
  '#700734'
]


public doughnutChartData: ChartData<'doughnut'> = {
  labels: this.labels,
  datasets: [
    {
      data: this.data,
      backgroundColor: this.colors 
    },
  ]
};

ngOnInit(): void {
  this.doughnutChartData.labels = this.labels;
  this.doughnutChartData.datasets[0].data = this.data;
}

public doughnutChartType: ChartType = 'doughnut';

}
