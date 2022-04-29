import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresoBuscarComponent } from './ingreso-buscar/ingreso-buscar.component';
import { IngresoNuevoComponent } from './ingreso-nuevo/ingreso-nuevo.component';

const routes: Routes = [
  {
    path: 'nuevo',
    component: IngresoNuevoComponent,
    data: { breadcrumb: 'Ingreso / Nuevo' }
  },
  {
    path: 'buscar',
    component: IngresoBuscarComponent,
    data: { breadcrumb: 'Ingreso / Buscar' }
  },
  {
    path: 'modificar',
    component: IngresoNuevoComponent,
    data: { breadcrumb: 'Ingreso / Modificar' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresoRoutingModule { }
