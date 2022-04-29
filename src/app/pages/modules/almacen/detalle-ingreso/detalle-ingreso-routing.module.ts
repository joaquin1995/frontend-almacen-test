import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleIngresBuscarComponent } from './detalle-ingres-buscar/detalle-ingres-buscar.component';
import { DetalleIngresoNuevoComponent } from './detalle-ingreso-nuevo/detalle-ingreso-nuevo.component';

const routes: Routes = [
  {
    path: 'nuevo',
    component: DetalleIngresoNuevoComponent,
    data: { breadcrumb: 'Detalle ingreso / Nuevo' }
  },
  {
    path: 'buscar',
    component: DetalleIngresBuscarComponent,
    data: { breadcrumb: 'Detalle ingreso / Buscar' }
  },
  {
    path: 'modificar',
    component: DetalleIngresoNuevoComponent,
    data: { breadcrumb: 'Detalle ingreso / Modificar' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleIngresoRoutingModule { }
