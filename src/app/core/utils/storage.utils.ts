import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class StorageUtils {
  constructor(
    private cookieService: CookieService
  ) { }



  set(key: string, value: string, path = '/') {
    this.cookieService.set(key, value, { path, secure: true });
  }
  get(key: string) {
    return this.cookieService.get(key);
  }

  check(key: string): boolean {
    return this.cookieService.check(key);
  }

  delete(key: string, path = '/') {
    this.cookieService.delete(key, path);
  }

  deleteAll() {
    this.cookieService.deleteAll('/');
  }



}
