import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleIngresoRoutingModule } from './detalle-ingreso-routing.module';
import { DetalleIngresoNuevoComponent } from './detalle-ingreso-nuevo/detalle-ingreso-nuevo.component';
import { DetalleIngresBuscarComponent } from './detalle-ingres-buscar/detalle-ingres-buscar.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    DetalleIngresoNuevoComponent,
    DetalleIngresBuscarComponent
  ],
  imports: [
    CommonModule,
    DetalleIngresoRoutingModule,
    SharedModule
  ]
})
export class DetalleIngresoModule { }
