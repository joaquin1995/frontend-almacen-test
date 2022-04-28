import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from './jwt.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BYPASS_LOG } from '../../interceptors/http-error.interceptor';

@Injectable({ providedIn: 'root' })
export class ApiService {
  headersConfig = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  private formatErrors(error) {
    let errorMessage = '';
    if (Number(error.status) === 401) {
      this.router.navigateByUrl('/login');
      errorMessage = 'Usuario no autorizado requiere autenticación';
    } else if (Number(error.status) === 0) {
      errorMessage = 'Error de respuesta del servidor';
    } else if (Number(error.status) === 404) {
      errorMessage = 'Error en la llamada HTTP, no found';
    } else if (Number(error.status) === 505) {
      errorMessage = 'Versión de HTTP no soportada';
    } else if (Number(error.status) === 500) {
      errorMessage = 'Error de servidor interno';
    } else if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  get(path: string, params: HttpParams = new HttpParams(), url?: string, byPassError: boolean = false): Observable<any> {
    const urlApi = url ? url : environment.api_url;
    return this.http.get(`${urlApi}${path}`,
     { headers: this.headersConfig, params, context: new HttpContext().set(BYPASS_LOG, byPassError) });
    // .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: object = {}, byPassError: boolean = false): Observable<any> {
    // const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body),
     { headers: this.headersConfig,
      context: new HttpContext().set(BYPASS_LOG, byPassError) });
    // .pipe(catchError(this.formatErrors));
  }
  putData(path: string, body: FormData, byPassError: boolean = false): Observable<any> {
    // const headers = new HttpHeaders().set('Accept', 'application/json');
    // console.log('llamando post', `${environment.api_url}${path}`);
    return this.http.put(`${environment.api_url}${path}`, body, {context: new HttpContext().set(BYPASS_LOG, byPassError)}); // .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: any = {}, byPassError: boolean = false): Observable<any> {
    // const headers = new HttpHeaders().set('content-type', 'application/json');
    // console.log('llamando post', `${environment.api_url}${path}`);
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body),
      { headers: this.headersConfig, context: new HttpContext().set(BYPASS_LOG, byPassError) }
    ); // .pipe(catchError(this.formatErrors));
  }
  postData(path: string, body: FormData, byPassError: boolean = false): Observable<any> {
    // const headers = new HttpHeaders().set('Accept', 'application/json');
    // console.log('llamando post', `${environment.api_url}${path}`);
    return this.http.post(`${environment.api_url}${path}`, body, {
      context: new HttpContext().set(BYPASS_LOG, byPassError)
    }); // .pipe(catchError(this.formatErrors));
  }

  delete(path, byPassError: boolean = false): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`, { headers: this.headersConfig, context: new HttpContext().set(BYPASS_LOG, byPassError) }
    ); // .pipe(catchError(this.formatErrors));
  }

  getBlob(path: string, params: HttpParams = new HttpParams() ,byPassError: boolean = false ): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, {
      headers: this.headersConfig,
      responseType: 'blob',
      context: new HttpContext().set(BYPASS_LOG, byPassError)
    });
  }

  postBlob(path: string, body: object = {}, byPassError: boolean = false): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body),
      {
        headers: this.headersConfig,
        responseType: 'blob',
        context: new HttpContext().set(BYPASS_LOG, byPassError)
      }
    ); // .pipe(catchError(this.formatErrors));
  }
}
