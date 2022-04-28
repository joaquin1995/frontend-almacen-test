import { Injectable, OnDestroy, OnInit, TemplateRef } from "@angular/core";
import { colores } from "../constants/parametros-personalizados";
import swal from "sweetalert2";
import { TOP_BUSQUEDA } from "../constants/variables-constantes";
import { Observable, Subject, timer } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AlertUtils } from "./alert.utils";
import { Filtro, LoadingService, ParametroReporte, ParametrosBusqueda, ReporteJasperService, RespuestaDB, RespuestaError } from "@core";

import * as printJS from 'print-js';
import { DomSanitizer } from "@angular/platform-browser";
// import { ModalRechazoComponent } from "@shared/ui/modal-rechazo/modal-rechazo.component";

@Injectable({ providedIn: "root" })
export class MetodosGlobales implements OnInit {

  isPDF = false;
  src: any;
  constructor(
    private alertUtils: AlertUtils,

    private loadingService: LoadingService,
    private reporteJasperService: ReporteJasperService,
    private sanitizer: DomSanitizer,

  ) { }
  ngOnInit() { }

  // mostrarModal<T>(componente: TemplateRef<any> | { new(...args: any[]): T; }, funcionRetorno?: Function, opcionesModal?: ModalOptions<T>) {
  //   const unsubscribe$: Subject<void> = new Subject();
  //   this.modalRef = this.modalService?.show(componente, opcionesModal);
  //   if (funcionRetorno) {
  //     this.modalRef.content.event.pipe(takeUntil(unsubscribe$)).subscribe(res => {
  //       if (res === true) {
  //         funcionRetorno();
  //       }
  //       unsubscribe$.next();
  //       unsubscribe$.complete();
  //     });
  //   }
  // }


  // cerrarModal() {
  //   this.modalRef?.hide();
  // }

  testTimerObservable() {
    const unsubscribe$: Subject<void> = new Subject();
    const source = timer(300, 300);

    const subscribe = source
      .pipe(takeUntil(unsubscribe$))
      .subscribe((val) => console.log(val));
  }

  setParametrosBusquedaIniciales(filtro: Filtro): ParametrosBusqueda {
    const parametroDefault =
      filtro.parametros?.length > 0 ? filtro.parametros[0].value : "";
    const parametroSelect = filtro.parametros.find(
      (item) => item.select === true
    );
    const parametrosBusqueda: ParametrosBusqueda = {
      mostrar: filtro.top ? filtro.top[0] : TOP_BUSQUEDA[0],
      valor: "",
      parametro: parametroSelect ? parametroSelect.value : parametroDefault,
    };
    return parametrosBusqueda;
  }

  quitarTildesYEnesAString(valor: string) {
    let auxValor = null;
    if (valor) {
      auxValor = valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    return auxValor;
  }

  mostrarErrores(respuestaError: RespuestaError, callbBack?: () => void): void {
    console.log("mostrarErrores", respuestaError, typeof (respuestaError));
    if (respuestaError.type === 'application/json') {
      this.MostrarErrorBlob(respuestaError);
    } else {
      let mensajeError = "";
      if (respuestaError.status === 400) {
        mensajeError = this.formatearErrorNet(respuestaError);
      } else {
        mensajeError = respuestaError.message;
      }
      this.loadingService.changeLoading(false);
      this.alertUtils.alertCustom('', mensajeError, 'warning', callbBack);
    }


  }
  private MostrarErrorBlob(respuestaError: any) {

    const reader = new FileReader();
    reader.onload = () => {
      const mensajeError = JSON.parse(reader.result as string).message;
      this.alertUtils.alertCustom('', mensajeError, 'warning');
    };
    reader.readAsText(respuestaError as any);
  }
  private MostrarErrorArraybuffer(respuestaError: any) {

    var decodedString = String.fromCharCode.apply(null, new Uint8Array(respuestaError));
    console.log("decodedString", decodedString);
    var objError = JSON.parse(decodedString) as RespuestaError;
    this.alertUtils.alertCustom('', objError.message, 'warning');

  }


  private formatearErrorNet(respuestaError: RespuestaError): string {
    let mensaje = ' <ul>';
    const error = respuestaError.errors;
    for (const prop in error) {
      mensaje += ' <li>' + this.arraytoString(error[prop]) + '</li>';
    }
    return mensaje + '</ul>';
  }
  arraytoString(array: Array<any>): string {
    let aux = "";
    array.forEach((item) => {
      aux += item + " ";
    });
    return aux.substring(0, aux.length - 1);
  }

  toFormData(model: any, form: FormData = null, namespace = ""): FormData {
    const formData = form || new FormData();
    let formKey;

    for (const propertyName in model) {
      if (!model.hasOwnProperty(propertyName) || !model[propertyName]) {
        continue;
      }
      formKey = namespace ? `${namespace}[${propertyName}]` : propertyName;
      if (model[propertyName] instanceof Date) {
        formData.append(formKey, model[propertyName].toISOString());
      } else if (model[propertyName] instanceof Array) {
        model[propertyName].forEach((element, index) => {
          const tempFormKey = `${formKey}[${index}]`;
          this.toFormData(element, formData, tempFormKey);
        });
      } else if (
        typeof model[propertyName] === "object" &&
        !(model[propertyName] instanceof File)
      ) {
        this.toFormData(model[propertyName], formData, formKey);
      } else {
        formData.append(formKey, model[propertyName]);
      }
    }
    return formData;
  }


  toInterface(modelo: any, input: any) {
    Object.keys(modelo).forEach(function (key, index) {
      if (Object.keys(input)[0] !== key) return;
      let modeloType = typeof modelo[key];
      let inputType = typeof input[key];
      if (modeloType !== inputType) {
        if (inputType == "object") return;
        if (modeloType == "string") input[key] = input[key] + "";
        if (modeloType == "number") input[key] = +input[key];
        if (modeloType == "boolean") input[key] = input[key] === "true" ? true : false;
        // Any other cases
      }
    });
    return input;
  }

  traerReporte(nombreReporte: String, arrayParametros: ParametroReporte[], printDialog: boolean = false) {
    const unsubscribe$: Subject<void> = new Subject();
    this.loadingService.changeLoading(true);
    this.reporteJasperService.traerReportePDF(nombreReporte, arrayParametros)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(respuesta => {
        this.loadingService.changeLoading(false);

        const file = new Blob([respuesta], { type: respuesta.type });
        if (printDialog) {
          const url = URL.createObjectURL(file);
          printJS(url);
          URL.revokeObjectURL(url);
        } else {
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        }


        unsubscribe$.next();
        unsubscribe$.complete();
      }, error => {
        this.loadingService.changeLoading(false);
        console.log(error);
      });
  }


  MostrarVentanaEmergente(url: string) {
    const Left = (window.screen.width / 2) - (800 / 2);
    const Top = (window.screen.height / 2) - (800 / 2);
    // window.open(`${environment.api_url}#/${url}`, '_blank', 'Height=600px,Width=800px,Top= ' + Top + ', Left= ' + Left);
    window.open(`${url}`, '_blank', 'Height=600px,Width=800px,Top= ' + Top + ', Left= ' + Left);
    // window.open(`http://${window.location.host}#/${url}`, '_blank', 'Height=600px,Width=800px,Top= ' + Top + ', Left= ' + Left);
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
