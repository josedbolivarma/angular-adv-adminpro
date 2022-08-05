import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  labels1: string[] = [ 'Facebook Sales', 'Instagram Sales', 'Mail Sales' ];

  public data1 = [ 400, 600, 100 ];
    
}
