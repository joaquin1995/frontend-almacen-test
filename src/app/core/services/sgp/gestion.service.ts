import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GestionDto, RespuestaDB } from '../../models';
import { ApiService } from '../admin/api.service';
import { GenericService } from './generic.service';

@Injectable({providedIn: 'root'})
export class GestionService extends GenericService<GestionDto> {
  parametros: string;
  readonly urlPath = '/api/Gestion/';

  constructor( public apiService: ApiService) {
    super(apiService, '/api/Gestion/');
  }

  listadoGestionPorUsuario(): Observable<RespuestaDB<GestionDto[]>> {
      return this.apiService.get(`${this.urlPath}usuario`)
        .pipe(map(data => data));
  }

}
