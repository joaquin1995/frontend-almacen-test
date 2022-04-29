import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoBuscarComponent } from './producto-buscar/producto-buscar.component';
import { ProductoNuevoComponent } from './producto-nuevo/producto-nuevo.component';

const routes: Routes = [
  {
    path: 'nuevo',
    component: ProductoNuevoComponent,
    data: { breadcrumb: 'Marca / Nuevo' }
  },
  {
    path: 'buscar',
    component: ProductoBuscarComponent,
    data: { breadcrumb: 'Marca / Buscar' }
  },
  {
    path: 'modificar',
    component: ProductoNuevoComponent,
    data: { breadcrumb: 'Marca / Modificar' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
