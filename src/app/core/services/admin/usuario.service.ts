import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  parametros: string;
  urlPath = '/api/usuario';

  constructor(private apiService: ApiService) {}

  buscarPaginado(valor: string, parametro: string, numeroPagina: number, cantidadMostrar: number) {
// tslint:disable-next-line: max-line-length
    return this.apiService.get(`${this.urlPath}?valor=${valor}&parametro=${parametro}&numeroPagina=${numeroPagina}&cantidadMostrar=${cantidadMostrar}`)
  .pipe(map(data => data));

}

  traerPorCodigo(valor: string) {
    return this.apiService.get(`${this.urlPath}/${valor}`)
    .pipe(map(data => data));
  }
  traer_usuario_actual(){
    return this.apiService.get(`${this.urlPath}/traer_usuario_actual`)
    .pipe(map(data => data));
  }

  guardar(modelo: any): Observable<any> {
    return this.apiService.postData(this.urlPath,  modelo )
      .pipe(map(data => data));
  }

  modificar(codigo: string, modelo: any): Observable<any> {
    return this.apiService.putData(`${this.urlPath}/${codigo}`,  modelo )
      .pipe(map(data => data));
  }

  eliminar(codigo: number): Observable<any> {
    return this.apiService.delete(`${this.urlPath}/${codigo}`)
      .pipe(map(data => data));
  }
}
