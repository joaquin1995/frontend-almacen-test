import { Injectable } from '@angular/core';
import { ParametroReporte } from '@core';
import { map } from 'rxjs/operators';
import { PostParametrosReporte } from '../../models';
import { ApiService } from '../admin/api.service';



@Injectable({providedIn: 'root'})
export class ReporteJasperService {
  parametros: string;
  urlPath = '/api/JasperReports';

  constructor(private apiService: ApiService) {}

  traerReportePDF(nombreReporte: String, arrayParametros: ParametroReporte[]) {
    return this.apiService.postBlob(`${this.urlPath}/traerReportePDF`,
    {
      nombreReporte: nombreReporte,
      arrayParametros: arrayParametros
    } as PostParametrosReporte)
    .pipe(map(data => data));
  }



}
