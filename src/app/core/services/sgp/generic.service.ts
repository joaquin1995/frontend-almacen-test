import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RespuestaDB, RespuestaListadoDB } from '../../models';
import { ApiService } from '../admin/api.service';

export class GenericService<T> {
  parametros: string;

  constructor(
    public apiService: ApiService
    , protected urlPath: string
  ) {

  }

  buscarPaginado(valor: string, parametro: string, numeroPagina: number, cantidadMostrar: number): Observable<RespuestaListadoDB<T[]>> {
    return this.apiService.get(`${this.urlPath}?valor=${valor}&parametro=${parametro}&numeroPagina=${numeroPagina}&cantidadMostrar=${cantidadMostrar}`)
      .pipe(map(data => data));
  }

  traerPorCodigo(valor: string): Observable<RespuestaDB<T>> {
      return this.apiService.get(`${this.urlPath}${valor}`)
        .pipe(map(data => data));
  }

  guardar(modelo: T): Observable<RespuestaDB<string>> {
    return this.apiService.post(this.urlPath, modelo, true)
      .pipe(map(data => data));
  }

  modificar(modelo: any): Observable<RespuestaDB<string>> {
    return this.apiService.put(`${this.urlPath}${modelo.num_sec}`, modelo)
      .pipe(map(data => data));
  }

  eliminar(numSec: string): Observable<RespuestaDB<string>> {
      return this.apiService.delete(`${this.urlPath}${numSec}`)
        .pipe(map(data => data));
  }


}
