import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { MenuAppService } from '@core';

@Injectable({
  providedIn: 'root'
})
export class AppMenuResolver implements Resolve<any> {
  constructor(
    private menuAppService: MenuAppService,
    private router: Router,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.menuAppService.traerMenu()
      .pipe(
        map(data => data.response),
        // catchError((err) => this.router.navigateByUrl('/')));
        catchError((err) => of([])));
  }
}
