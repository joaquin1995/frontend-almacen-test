import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaseRoutingModule } from './fase-routing.module';
import { FaseNuevoComponent } from './fase-nuevo/fase-nuevo.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    FaseNuevoComponent
  ],
  imports: [
    CommonModule,
    FaseRoutingModule,
    SharedModule
  ]
})
export class FaseModule { }
