import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectoNuevoComponent } from './proyecto-nuevo/proyecto-nuevo.component';

const routes: Routes = [
    {
      path: 'nuevo',
      component: ProyectoNuevoComponent,
      data: { breadcrumb: 'Proyecto / Nuevo' }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectoRoutingModule { }
