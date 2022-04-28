import { Injectable } from '@angular/core';
import { EstadoPagina } from '../../enum';

@Injectable({
  providedIn: 'root'
})
export class MainContainerService {

  public banderaEstado =  EstadoPagina.Ok;
  public mensaje = '';
  constructor() { }

  cargando(): void {
    this.banderaEstado = EstadoPagina.Cargando;
  }
  error(mensaje: string = 'Se ha producido un error al cargar la pagina.'): void {
    this.mensaje = mensaje;
    this.banderaEstado = EstadoPagina.Error;
  }
  ok(): void {
    this.banderaEstado = EstadoPagina.Ok;
  }


}
