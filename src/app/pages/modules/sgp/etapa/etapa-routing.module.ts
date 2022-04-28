import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtapaNuevoComponent } from './etapa-nuevo/etapa-nuevo.component';

const routes: Routes = [
  {
    path: 'nuevo/:nsec_proyecto',
    component: EtapaNuevoComponent,
    data: { breadcrumb: 'Fase / Nuevo' }
  },
  {
    path: 'modificar/:num_sec',
    component: EtapaNuevoComponent,
    data: { breadcrumb: 'Fase / Modificar' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtapaRoutingModule { }
