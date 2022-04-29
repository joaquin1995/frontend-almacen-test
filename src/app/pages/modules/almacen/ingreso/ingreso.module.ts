import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresoRoutingModule } from './ingreso-routing.module';
import { IngresoNuevoComponent } from './ingreso-nuevo/ingreso-nuevo.component';
import { IngresoBuscarComponent } from './ingreso-buscar/ingreso-buscar.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    IngresoNuevoComponent,
    IngresoBuscarComponent
  ],
  imports: [
    CommonModule,
    IngresoRoutingModule,
    SharedModule
  ]
})
export class IngresoModule { }
