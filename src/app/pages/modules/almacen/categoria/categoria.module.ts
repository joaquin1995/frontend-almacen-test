import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    SharedModule
  ]
})
export class CategoriaModule { }
