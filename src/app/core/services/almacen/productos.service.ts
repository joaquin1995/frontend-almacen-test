import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Productos } from '../../models/almacen';
import { ApiService } from '../admin/api.service';

@Injectable({ providedIn: 'root' })
export class ProductosService {
    parametros: string;
    urlPath = '/api/Productos/';

    constructor(private apiService: ApiService) { }

    buscarPaginado(valor: string, parametro: string, numeroPagina: number, cantidadMostrar: number) {
        return this.apiService.get(`${this.urlPath}?valor=${valor}&parametro=${parametro}&numeroPagina=${numeroPagina}&cantidadMostrar=${cantidadMostrar}`)
            .pipe(map(data => data));
    }

    traerPorCodigo(valor: string) {
        return this.apiService.get(`${this.urlPath}${valor}`)
            .pipe(map(data => data));
    }

    guardar(modelo: Productos): Observable<any> {
        return this.apiService.post(this.urlPath, modelo, true)
            .pipe(map(data => data));
    }

    modificar(modelo: Productos): Observable<any> {
        return this.apiService.put(`${this.urlPath}`, modelo)
            .pipe(map(data => data));
    }

    eliminar(numSec: string): Observable<any> {
        return this.apiService.delete(`${this.urlPath}${numSec}`)
            .pipe(map(data => data));
    }

}
