import { Injectable } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { colores, mostrar_mensaje_personalizado, opciones_confirmar, TipoAlerta } from '../constants';
@Injectable({providedIn: 'root'})
export class AlertUtils {

  alertToast(mensaje: string = "Error Desconocido", tipoAlerta: TipoAlerta  ) {
    swal.fire({
      icon: tipoAlerta ,
      title: '<div style="color:white">' + mensaje + '</div>',
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 4000,
      background: '#bf1725'
    });
  }


  alertError(title: string) {
    swal.fire({
      icon: 'error',
      title: '<div style="color:white">' + title + '</div>',
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 4000,
      background: '#bf1725'
    });
  }
  alertQuestion(callback?: () => void, callbackCancel?: () => void) {
    swal.fire(opciones_confirmar).then((result) => {
      if (result.value) {
        // this.guardarEmpresa();
          callback();

      } else if (result.dismiss === swal.DismissReason.cancel) {
        if (callbackCancel) {
          callbackCancel();
        }
      }
    });
  }

  alertQuestionCustom(title: string, callback: () => void) {
    swal.fire({
      title: title,
      icon: 'question',
      // customClass:  'slide-from-top',
      confirmButtonColor: colores.botonOK,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
  }).then((result) => {
      if (result.value) {
        // this.guardarEmpresa();
        callback();
      } else if (result.dismiss === swal.DismissReason.cancel) {
      }
    });
  }

  alertDelete(callback: () => void) {
    const opciones_confirmar: SweetAlertOptions = {
      title: `¿Está seguro de Eliminar el Registro?`,
      icon: 'question',
      // customClass:  'slide-from-top',
      confirmButtonColor: colores.botonCONFIRMA_ELIMINAR,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
  }
    swal.fire(opciones_confirmar).then((result) => {
      if (result.value) {
        callback();
      } else if (result.dismiss === swal.DismissReason.cancel) {
      }
    });
  }

  alertOk(callback?: () => void) {
    swal.fire({
      title:  'Operación Completada Exitosamente',
      icon: 'success',
      text: '',
      // customClass: 'slide-from-top',
      confirmButtonColor: colores.botonOK,
      confirmButtonText: 'Ok',
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then((result) => {
      if (result.value === true) {
        if (callback) {
          callback();
        }
      }
    });
  }

  alertSuccess(title: string , text: string, callback?: () => void) {
    swal.fire({
      title,
      icon: 'success',
      text,
      // customClass: 'slide-from-top',
      confirmButtonColor: colores.botonOK,
      confirmButtonText: 'Ok',
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then((result) => {
      if (result.value === true) {
        // TODO: EVENT EMITER
        if (callback) {
          callback();
        }
      }
    });
  }
  alertCustom(titulo: string, texto: string,
              iconoTipo: TipoAlerta , callback?: () => void) {
    const config = mostrar_mensaje_personalizado(titulo, texto, iconoTipo);
    console.log('mostrarErrorNet => alertCustom = ');
    swal.fire(config).then((result) => {
      if (result?.value) {
        // this.guardarEmpresa();
        if (callback) {
          callback();
        }
      } else if (result.dismiss === swal.DismissReason.cancel) {
      }
    });
  }



}
