import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoBuscarComponent } from './producto-buscar/producto-buscar.component';
import { ProductoNuevoComponent } from './producto-nuevo/producto-nuevo.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ProductoBuscarComponent,
    ProductoNuevoComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    SharedModule
  ]
})
export class ProductoModule { }
