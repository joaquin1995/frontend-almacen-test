import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private objShared = new BehaviorSubject<any>(false);
  private objBusquedaListado = new BehaviorSubject<any>(false);
  private objSteperChange = new BehaviorSubject<any>(null);
  currentObjShared = this.objShared.asObservable();
  currentBusquedaListado = this.objBusquedaListado.asObservable();
  currentSteperChange = this.objSteperChange.asObservable();

  constructor() { }

  changeObjShared(_objShared: any) {
    this.objShared.next(_objShared);
  }

  changeObjBusquedaListado(_objBusquedaListado: any) {
    this.objBusquedaListado.next(_objBusquedaListado);
  }

  changeObjSteperChange(_objSteperChange: any) {
    this.objSteperChange.next(_objSteperChange);
  }

}
