import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'dashboards' },
  { path: 'inicio', redirectTo: 'dashboards' },
  // { path: 'dashboard', component: DefaultComponent, resolve: { isAuthenticated: AppAuthResolver } },
  // { path: 'dashboard', component: DefaultComponent },
  { path: 'categoria', loadChildren: () => import('./modules/almacen/categoria/categoria.module').then(m => m.CategoriaModule), },
  { path: 'marca', loadChildren: () => import('./modules/almacen/marca/marca.module').then(m => m.MarcaModule), },
  { path: 'producto', loadChildren: () => import('./modules/almacen/producto/producto.module').then(m => m.ProductoModule), },
  { path: 'ingreso', loadChildren: () => import('./modules/almacen/ingreso/ingreso.module').then(m => m.IngresoModule), },
  { path: 'detalle-ingreso', loadChildren: () => import('./modules/almacen/detalle-ingreso/detalle-ingreso.module').then(m => m.DetalleIngresoModule), },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

