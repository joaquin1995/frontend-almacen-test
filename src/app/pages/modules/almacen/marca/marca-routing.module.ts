import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcaBuscarComponent } from './marca-buscar/marca-buscar.component';
import { MarcaNuevoComponent } from './marca-nuevo/marca-nuevo.component';

const routes: Routes = [
  {
    path: 'nuevo',
    component: MarcaNuevoComponent,
    data: { breadcrumb: 'Marca / Nuevo' }
  },
  {
    path: 'buscar',
    component: MarcaBuscarComponent,
    data: { breadcrumb: 'Marca / Buscar' }
  },
  {
    path: 'modificar',
    component: MarcaNuevoComponent,
    data: { breadcrumb: 'Marca / Modificar' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcaRoutingModule { }
