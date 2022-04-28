import { SweetAlertOptions } from 'sweetalert2';
export const colores = {
    botonOK: 'rgba(0, 115, 59, 1)',
    botonCONFIRMA_ELIMINAR: 'rgb(220, 53, 69)',
    imagen_confirmar: '../assets/img/pregunta.png'
};


// tslint:disable-next-line: variable-name
export const opciones_confirmar: SweetAlertOptions = {
    title: '¿Guardar Datos?',
    icon: 'question',
    // customClass:  'slide-from-top',
    confirmButtonColor: colores.botonOK,
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
};

// tslint:disable-next-line: variable-name
export function opciones_confirmar_personalizado(texto = '¿Guardar Datos?', icono = 'question'): SweetAlertOptions {
    return {
        title: texto,
        icon: icono,
        confirmButtonText: 'Si',
        confirmButtonColor: colores.botonOK,
        showCancelButton: true,
        cancelButtonText: 'No',
        focusCancel: true
    } as SweetAlertOptions;
}

// tslint:disable-next-line: variable-name
export function mostrar_mensaje_personalizado(titulo: string, texto: string, iconoTipo = 'info'): SweetAlertOptions {
    return {
        title: titulo,
        html: texto,
        icon: iconoTipo,
        confirmButtonColor: colores.botonOK,
        focusCancel: true
    } as SweetAlertOptions;
}



