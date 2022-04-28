import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpContextToken
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { AlertUtils } from '../utils/alert.utils';
import { Router } from '@angular/router';
import { LoadingService, MetodosGlobales, ModalService, } from '..';

export const BYPASS_LOG = new HttpContextToken(() => false);

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector,
    private alerUtils: AlertUtils,
    private modalService: ModalService,
    private loadingService: LoadingService,
    private metodosGlobales: MetodosGlobales,
    public router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        // retry(0),
        catchError((httpErrorResponse: HttpErrorResponse) => {
          const { status, error } = httpErrorResponse;
          console.log('intercept => error = ', httpErrorResponse);
          let errorMessage = '';
          if (Number(httpErrorResponse.status) === 401) {
            console.log('error 401');
            this.modalService.closeModal();
            this.router.navigateByUrl('/login');
            errorMessage = 'error(401): Usuario no autorizado, requiere autenticación';
            this.mostrarError(errorMessage);
          } else if (Number(status) === 0) {
            const error = {
              message: 'El servidor está fuera de servicio, llamar al administrador de sistemas',
            }
            if (request.context.get(BYPASS_LOG) === true) {
              throw (error);
            }
            this.mostrarError(error);
          }
          else if (Number(status) === 403) {
            const error = {
              message: 'No tiene permiso para realizar la operacion solicitada',
            }
            if (request.context.get(BYPASS_LOG) === true) {
              throw (error);
            }
            this.mostrarError(error);
          }
          else if (Number(status) === 400) {
            errorMessage = 'error(400): Error en la llamada HTTP, no found';
            if (request.context.get(BYPASS_LOG) === true) {
              throw (error);
            }
            console.log('intercept => 400 ');
            this.metodosGlobales.mostrarErrores(error);
          } else if (Number(status) === 404) {
            errorMessage = 'error(404): Error en la llamada HTTP, no found';
            this.mostrarError(errorMessage);
          } else if (Number(status) === 505) {
            errorMessage = 'error(505): Versión de HTTP no soportada';
            this.mostrarError(errorMessage);
          } else if (Number(status) === 500) {
            // errorMessage = 'error(500): Error de servidor interno';
            this.mostrarError(error);
          } else if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.message}`;
            this.mostrarError(errorMessage);
          } else {
            // server-side error
            errorMessage = `Error Code: ${status}\nMessage: ${error.message}`;
            this.mostrarError(errorMessage);
          }
          // this.alerUtils.alertToast(errorMessage,'error');
          // this.loadingService.changeLoading(false);
          // this.mostrarError(errorMessage);
          return throwError(error);
        })
      );
  }
  mostrarError(error: any) {
    console.log('mostrarError => ', error);
    const errorMessage = error.message ? error.message : error;
    console.log(' => errorMessage = ', errorMessage);
    this.alerUtils.alertToast(errorMessage, 'error');
    this.loadingService.changeLoading(false);
  }

}
