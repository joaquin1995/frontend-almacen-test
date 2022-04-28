import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() { }
  public setItem(key: string, value: string) {
    window.localStorage[key] = value;
    // localStorage.setItem(key, value);
  }

  public getItem(key: string) {
    return window.localStorage[key];
  }
  public removeItem(key: string) {
    window.localStorage.removeItem(key);
  }

}
