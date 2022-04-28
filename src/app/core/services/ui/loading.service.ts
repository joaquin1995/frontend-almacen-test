
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class LoadingService {
  
    private objShared = new BehaviorSubject<boolean>(false);
    currentObjShared = this.objShared.asObservable();
  
    constructor() { }
  
    changeLoading(dashboarVisible: boolean) {
      this.objShared.next(dashboarVisible);
    }
  
  }