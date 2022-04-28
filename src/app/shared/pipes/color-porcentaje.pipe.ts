import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorPorcentaje'
})
export class ColorPorcentajePipe implements PipeTransform {

  transform(porcentaje: number): string {
    let color = '';

    // color = porcentaje > 0 ? 'cincuenta' : 'cero';
    if (porcentaje <= 50)
      color = 'cincuenta';
    if (porcentaje <= 25)
      color = 'veinticinco';
    if (porcentaje <= 0)
      color = 'cero';
    return color;
  }

}
