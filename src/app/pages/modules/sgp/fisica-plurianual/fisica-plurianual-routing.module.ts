import { NgModule } from '@angular/core';
import { FisicaPlurianualComponent } from './fisica-plurianual.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FisicaPlurianualComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FisicaPlurianualRoutingModule { }
