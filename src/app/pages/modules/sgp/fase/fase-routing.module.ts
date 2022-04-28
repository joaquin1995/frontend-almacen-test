import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaseNuevoComponent } from './fase-nuevo/fase-nuevo.component';

const routes: Routes = [
  {
    path: 'nuevo/:nsec_proyecto',
    component: FaseNuevoComponent,
    data: { breadcrumb: 'Fase / Nuevo' }
  },
  {
    path: 'modificar/:num_sec',
    component: FaseNuevoComponent,
    data: { breadcrumb: 'Fase / Modificar' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaseRoutingModule { }
