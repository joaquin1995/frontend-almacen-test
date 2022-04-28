import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject, ReplaySubject,of, Subscription } from "rxjs";
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { AlertUtils } from '../../utils/alert.utils';
import { User, UsuarioLogin } from '../../models/admin/user.model';
import { LocalStorageService, ModalService } from '..';
import { MetodosGlobales, StorageUtils } from '../../utils';
import { KeyStorage } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(0);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  urlPath = '/api/v1/login';

  tokenSubscription = new Subscription()
  timeout: Number;
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private jwtHelper: JwtHelperService,
    private alertUtils: AlertUtils,
    private modalService: ModalService,
    private metodosGlobales: MetodosGlobales,
    private router: Router,
    private localStorageService: LocalStorageService
    , private storageUtils: StorageUtils
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      // TODO: Verificar login
      // this.isAuthenticatedSubject.next(true);
      const auxProyecto = this.storageUtils.get(KeyStorage.PROYECTO);
      const auxGestion = this.storageUtils.get(KeyStorage.GESTION);
      if (!auxProyecto || !auxGestion) {
        this.router.navigateByUrl('/area-trabajo/seleccionar');
        // this.router.navigateByUrl('/seleccionar-proyecto');
      }
      this.apiService.get(`${this.urlPath}/populate`)
      .subscribe({
        next: data => {
          this.setAuth(data);
        },
        error: () => {
          this.purgeAuth();
        }
      });
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: UsuarioLogin) {
    // Save JWT sent from server in localstorage
    console.log('UsuarioLogin', user);
    const {token} = user;
    this.jwtService.saveToken(token);
    this.jwtService.saveDatosUsuario(user.usuario);
    // Set current user data into observable
    this.currentUserSubject.next(user.usuario);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
    // console.log('setAuth', true, user);

    // Inicia el contador de sesion
    // TODO: Corregir  para produccion TypeError: this.tokenGetter is not a function
    if (token) {
      const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
      console.log('expirationDate', expirationDate);
      this.timeout = this.jwtHelper.getTokenExpirationDate(token).valueOf() - new Date().valueOf();
      this.expirationCounter(this.timeout);
    }

  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    this.tokenSubscription.unsubscribe();

  }
  logout(): void {
    this.modalService.closeModal();
    //TODO: verificar si debe cerrar la ventanas modal
    // this.metodosGlobales.cerrarModal();
    this.purgeAuth();
    this.router.navigate(['/login']);
  }

  expirationCounter(timeout) {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
      console.log('EXPIRED!!');

      this.logout();
      this.alertUtils.alertCustom('', 'Su <b style="color:coral;">sesión</b> ha expirado!', 'warning', () => {
        // this.router.navigate(["/login"]);
      });
    });
  }


  attemptAuth(user): Observable<UsuarioLogin> {
    // return this.apiService.post(`${this.urlPath}/Authenticate`, user)
    return this.apiService.post(`${this.urlPath}`, user, true)
      .pipe(map(
      data => {
        this.setAuth(data);
        return data;
      }
    ));

    // return this.apiService.post(`${this.urlPath}/Authenticate`, user).do(()=>{});
    // return this.http.post<User>('/api/login', {email, password})
    //         .do(res => this.setSession)
    //         .shareReplay();
  }
  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user): Observable<User> {
    return this.apiService
    .put('/user', { user })
    .pipe(map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    }));
  }

  verificarPemisos(url): Observable<User> {
    return this.apiService.post(`${this.urlPath}/permisos`, url)
      .pipe(map(
      data => {
        console.log('verificarPemisos', data);
        return data;
      }
    ));
  }


}
