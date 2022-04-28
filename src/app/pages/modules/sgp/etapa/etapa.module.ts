import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtapaRoutingModule } from './etapa-routing.module';
import { EtapaNuevoComponent } from './etapa-nuevo/etapa-nuevo.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    EtapaNuevoComponent
  ],
  imports: [
    CommonModule,
    EtapaRoutingModule,
    SharedModule
  ]
})
export class EtapaModule { }
