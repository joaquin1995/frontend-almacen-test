import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Funcion, RolFuncion } from '../../models';
import { UsuarioFuncion } from '../../models/admin/usuario-funcion.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionService {
    parametros: string;
    urlPath = '/api/funcion';

    constructor(private apiService: ApiService) { }
    buscarPaginado(valor: string, parametro: string, numeroPagina: number, cantidadMostrar: number) {
// tslint:disable-next-line: max-line-length
        return this.apiService.get(`${this.urlPath}?valor=${valor}&parametro=${parametro}&numeroPagina=${numeroPagina}&cantidadMostrar=${cantidadMostrar}`)
      .pipe(map(data => data));
    }

    traerPorCodigo(valor: string) {
    return this.apiService.get(`${this.urlPath}/${valor}`)
    .pipe(map(data => data));
    }

    guardar(modelo: Funcion): Observable<any> {
    return this.apiService.post(this.urlPath,  modelo )
        .pipe(map(data => data));
    }

    modificar(codigo: string, modelo: Funcion): Observable<any> {
    return this.apiService.put(`${this.urlPath}/${codigo}`,  modelo )
        .pipe(map(data => data));
    }

    eliminar(codigo: string): Observable<any> {
    return this.apiService.delete(`${this.urlPath}/${codigo}`)
        .pipe(map(data => data));
    }

    traerGrupoFuncion(codigoRol: string) {
        return this.apiService.get(`${this.urlPath}/rol/${codigoRol}/grupo_funcion`)
        .pipe(map(data => data));
    }
    traerGrupoFuncionUsuario(codigoUsuario: string) {
        return this.apiService.get(`${this.urlPath}/traer_grupo_por_funcion_usuario?codigo=${codigoUsuario}`)
        .pipe(map(data => data));
    }
    guardarRolFuncion(modelo: Array<RolFuncion>): Observable<any> {
        return this.apiService.post(`${this.urlPath}/guardar_rol_funcion`,  modelo )
            .pipe(map(data => data));
    }
    guardarUsuarioFuncion(modelo: Array<UsuarioFuncion>): Observable<any> {
        return this.apiService.post(`${this.urlPath}/guardar_usuario_funcion`,  modelo )
            .pipe(map(data => data));
    }
}
