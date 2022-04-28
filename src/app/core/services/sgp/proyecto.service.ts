import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProyectoDto, RespuestaDB } from '../../models';
import { ApiService } from '../admin/api.service';
import { GenericService } from './generic.service';

@Injectable({providedIn: 'root'})
export class ProyectoService extends GenericService<ProyectoDto> {
  parametros: string;
  url = '/api/Proyecto/';

  constructor( public apiService: ApiService) {
    super(apiService, 'Proyecto');
  }

  listadoProyectoPorUsuarioGestion(nsecGestion: number): Observable<RespuestaDB<ProyectoDto[]>> {
      return this.apiService.get(`${this.url}${nsecGestion}/gestionUsuario`)
        .pipe(map(data => data));
  }

}
