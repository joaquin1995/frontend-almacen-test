import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionarProyectoComponent } from './seleccionar-proyecto.component';

const routes: Routes = [
  { path: '', component: SeleccionarProyectoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeleccionarProyectoRoutingModule { }
