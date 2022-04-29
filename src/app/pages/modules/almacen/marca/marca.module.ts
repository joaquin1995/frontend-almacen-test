import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcaRoutingModule } from './marca-routing.module';
import { MarcaBuscarComponent } from './marca-buscar/marca-buscar.component';
import { MarcaNuevoComponent } from './marca-nuevo/marca-nuevo.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    MarcaBuscarComponent,
    MarcaNuevoComponent
  ],
  imports: [
    CommonModule,
    MarcaRoutingModule,
    SharedModule
  ]
})
export class MarcaModule { }
