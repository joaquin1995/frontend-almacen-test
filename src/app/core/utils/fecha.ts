export class Fecha {

  static obtenerFechaEN(fechaES: string): string{
    const fechaArray: String[] = fechaES.split('/');
    const fechaEN = fechaArray[2] + '-' + fechaArray[1] + '-' + fechaArray[0];
    return fechaEN;
  }
}
