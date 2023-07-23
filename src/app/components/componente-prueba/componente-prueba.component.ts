import { Component, Input } from '@angular/core';
import { Product } from './../../models/product.model'
@Component({
  selector: 'app-componente-prueba',
  templateUrl: './componente-prueba.component.html',
  styleUrls: ['./componente-prueba.component.scss']
})
export class ComponentePruebaComponent {
  @Input() product!: Product; // el ! es decirle que no hace falta inicializarlo, otra forma es crear el objeto sin valores iniciales.
}
