import { Injectable } from '@angular/core';
// import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';
// import { Menu, PostMenu } from '../../../theme/components/menu/menu.model';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  parametros: string;
  urlPath = '/api/menu';

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

  // valor=&parametro=etiqueta&numeroPagina=0&cantidadMostrar=1000
  traerListaPaginado(valor: string, parametro: string, numeroPagina: number, cantidadMostrar: number) {
// tslint:disable-next-line: max-line-length
    return this.apiService.get(`${this.urlPath}?valor=${valor}&parametro=${parametro}&numeroPagina=${numeroPagina}&cantidadMostrar=${cantidadMostrar}`)
    .pipe(map(data => data));
  }

  traerMenuPadres() {
    // tslint:disable-next-line: max-line-length
        return this.apiService.get(`${this.urlPath}/traer_menu_padres`)
        .pipe(map(data => data));
      }

  guardar(modelo: any): Observable<any> {
    return this.apiService.post(this.urlPath,  modelo )
      .pipe(map(data => data));
  }

  modificar(codigo: string, modelo: any): Observable<any> {
    return this.apiService.put(`${this.urlPath}/${codigo}`,  modelo )
      .pipe(map(data => data));
  }

  eliminar(codigo: number): Observable<any> {
    return this.apiService.delete(`${this.urlPath}/${codigo}`)
      .pipe(map(data => data));
  }
}
