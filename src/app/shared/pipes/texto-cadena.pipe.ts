import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textoCadena'
})
export class TextoCadenaPipe implements PipeTransform {

   // transform(value: unknown, ...args: unknown[]): unknown {
    transform(value: string, separador: string, index: number): string {
      console.log('textoCadena', value, separador , index);
      const textos = value.split(separador);

      return textos[index] ? textos[index] : '';
  }

}
