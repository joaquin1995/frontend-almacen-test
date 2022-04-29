import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NuevoComponent } from './nuevo/nuevo.component';
import { BuscarComponent } from './buscar/buscar.component';


@NgModule({
  declarations: [
    NuevoComponent,
    BuscarComponent
  ],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    SharedModule
  ]
})
export class CategoriaModule { }
