import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarComponent } from './buscar/buscar.component';
import { NuevoComponent } from './nuevo/nuevo.component';

const routes: Routes = [
  {
    path: 'nuevo',
    component: NuevoComponent,
    data: { breadcrumb: 'Categoria / Nuevo' }
  },
  {
    path: 'buscar',
    component: BuscarComponent,
    data: { breadcrumb: 'Categoria / Buscar' }
  },
  {
    path: 'modificar',
    component: NuevoComponent,
    data: { breadcrumb: 'Categoria / Modificar' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriaRoutingModule { }
