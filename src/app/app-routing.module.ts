import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';
import { Page404Component } from './extrapages/page404/page404.component';
import { AppMenuResolver } from './app-menu.resolver';
import { AppAuthResolver } from './app-auth.resolver';
import { AuthGuard } from '@core';

const routes: Routes = [
  //{ path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  {
    path: '', resolve: {
      //  menu: AppMenuResolver
    }, component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },

  // { path: 'seleccionar-proyecto', loadChildren: () => import('./pages/modules/sgp/seleccionar-proyecto/seleccionar-proyecto.module').then(m => m.SeleccionarProyectoModule), resolve: { isAuthenticated: AppAuthResolver }, canActivate: [AuthGuard]  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
