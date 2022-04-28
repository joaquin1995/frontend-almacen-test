import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectoRoutingModule } from './proyecto-routing.module';
import { ProyectoNuevoComponent } from './proyecto-nuevo/proyecto-nuevo.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ProyectoNuevoComponent
  ],
  imports: [
    CommonModule,
    ProyectoRoutingModule,
    SharedModule
  ]
})
export class ProyectoModule { }
