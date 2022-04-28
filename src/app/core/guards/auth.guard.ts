import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { take } from 'rxjs/operators';
import { UserService } from '../services/admin/user.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // console.log('canActive', state.url);
    this.userService.isAuthenticated.subscribe(data => {
        console.log('valor del data', data);
        if (!data) {
          this.router.navigate(['login']);
        }
      });
    return this.userService.isAuthenticated.pipe(take(1));

  }
}
