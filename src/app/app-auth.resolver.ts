import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { take } from 'rxjs/operators';
import { UserService } from './core/services/admin/user.service';

@Injectable({providedIn: 'root'})
export class AppAuthResolver implements Resolve<boolean> {
  // isAuthenticated: boolean;
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log('resolve', state.url);
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        // this.isAuthenticated = authenticated;

        // set the article list accordingly
        console.log('isAuthenticated: ', authenticated);
        if (!authenticated) {
          this.router.navigateByUrl('/login');
        }
      }
    );
    return this.userService.isAuthenticated.pipe(take(1));
  }
}
