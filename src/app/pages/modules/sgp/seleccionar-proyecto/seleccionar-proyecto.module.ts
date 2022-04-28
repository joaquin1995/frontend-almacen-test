import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeleccionarProyectoRoutingModule } from './seleccionar-proyecto-routing.module';
import { SeleccionarProyectoComponent } from './seleccionar-proyecto.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    SeleccionarProyectoComponent
  ],
  imports: [
    CommonModule,
    SeleccionarProyectoRoutingModule,
    SharedModule
  ]
})
export class SeleccionarProyectoModule { }
