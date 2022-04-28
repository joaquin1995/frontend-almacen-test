import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const headersConfig = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json'
    // };
    const token = this.jwtService.getToken();
    let request:  HttpRequest<any>;
    if (token) {
     //  headersConfig['Authorization'] = `Bearer ${token}`;
     // req.headers.set('Authorization', `Bearer ${token}`);
     request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    } else {
      request = req.clone();
    }
    // console.log('interceptor');
    // const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
