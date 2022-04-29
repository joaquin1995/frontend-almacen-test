import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MetodosGlobales, ParametrosCustomSelectTemnplate } from 'src/app/core';
@Component({
  selector: 'app-select-custom-template',
  templateUrl: './select-custom-template.component.html',
  styleUrls: ['./select-custom-template.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCustomTemplateComponent),
      multi: true
    }
  ]
})
export class SelectCustomTemplateComponent implements OnInit {

  @Input() arrayObjeto: any[];
  @Input() labelCustom: string = 'nombre';
  @Input() placeholder: string;
  @Input() formControl: FormControl;
  @Input() loading: boolean = false;

  @Input() arrayMostrarBuscarPropiedad: ParametrosCustomSelectTemnplate[] = [
    {
      propiedad: 'nombre'
      , titulo: 'Producto'
      , bandera_mostrar: true
      , bandera_buscar: true
    }
    , {
      propiedad: 'stock'
      , titulo: 'Stock'
      , bandera_mostrar: true
      , bandera_buscar: true
    }
    , {
      propiedad: 'precio_venta'
      , titulo: 'Precio de venta'
      , bandera_mostrar: true
      , bandera_buscar: true
    }
    , {
      propiedad: 'codigo'
      , titulo: 'codigo'
      , bandera_mostrar: true
      , bandera_buscar: true
    }
  ]


  public input$ = new Subject<string | null>();
  private unsubscribe$: Subject<void> = new Subject();
  scroll: boolean = true;
  arrayObjetoBuffer: any[];
  arrayObjetoBufferAux: any[];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;



  currentValue: any;
  onChange = (_: any) => { };
  onTouch = () => { };
  isDisabled: boolean;

  constructor(
    private metodosGlobales: MetodosGlobales
  ) {
    this.input$.pipe(

      debounceTime(100),
      distinctUntilChanged(),

    ).pipe(takeUntil(this.unsubscribe$))
      .subscribe((term) => {
        if (!this.arrayObjeto) {
          return;
        }
        if (term) {


          this.loading = true;
          this.scroll = false;
          console.log(term);

          this.arrayObjetoBuffer = [];
          console.log(this.arrayObjetoBufferAux);

          this.filterItems(term.trim());
        } else {
          this.arrayObjetoBuffer = this.arrayObjeto.slice(0, this.bufferSize);
          // this.arrayObjetoBuffer = [];
          // this.arrayObjetoBuffer = this.arrayObjetoBufferAux;
        }
      });
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.arrayObjeto && this.arrayObjeto.length > 0) {
      this.arrayObjetoBuffer = this.arrayObjeto.slice(0, this.bufferSize);
      const valorFormControl = this.formControl.value;
      if (valorFormControl) {
        const indice = this.arrayObjetoBuffer.findIndex((item) => item.num_sec == valorFormControl);
        if (indice < 0) {
          const objetoABuscar = this.arrayObjeto.find((item) => item.num_sec == valorFormControl);
          if (objetoABuscar) {
            this.arrayObjetoBuffer = [objetoABuscar, ...this.arrayObjetoBuffer];
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }




  filterItems = (term: string) => {
    if (term.length > 0) {
      let query = this.metodosGlobales.quitarTildesYEnesAString(term.toUpperCase());
      // this.arrayObjetoBuffer = this.arrayObjeto.filter(p => this.metodosGlobales.quitarTildesYEnesAString(this.metodosGlobales.quitarTildesYEnesAString(p.nombre).toUpperCase()).indexOf(query) >= 0);
      this.arrayObjetoBuffer = this.arrayObjeto.filter(p => this.filterArray(query, p));
      this.loading = false;
    } else {
      this.scroll = true;
      this.arrayObjetoBuffer = [];
      this.arrayObjetoBuffer = this.arrayObjetoBufferAux;
      this.loading = false;
    }
  }

  filterArray(valoraBuscar: string, objeto: any): boolean {
    let auxValorABuscar: string
    let auxCondicion: string;

    // quita tildes y eñes a strings
    if (valoraBuscar) {
      auxValorABuscar = this.metodosGlobales.quitarTildesYEnesAString(valoraBuscar).toUpperCase();
    }

    // quita tildes y eñes a strings a todas las propiedades del objeto para hacer la busqueda
    for (const k in objeto) {
      if (objeto.hasOwnProperty(k)) {
        if (objeto[k]) {
          objeto[k] = this.metodosGlobales.quitarTildesYEnesAString((objeto[k].toString())).toUpperCase();
        }
      }
    }

    // arma string de CONDICIONES para la busqueda
    for (let index = 0; index < this.arrayMostrarBuscarPropiedad.length; index++) {
      const element = this.arrayMostrarBuscarPropiedad[index];

      if (element.bandera_buscar) {
        if (index > 0) {
          auxCondicion = `${auxCondicion} || `;
        }
        auxCondicion = `${auxCondicion ? auxCondicion : ''}'${objeto[element.propiedad]}'.indexOf('${auxValorABuscar}') >= 0`;
      }
    }
    const hola = 'sd';
    // ejecuta función de búsqueda con la condición dinámica armada
    var evaluate = (c) => Function(`return ${c}`)();

    return evaluate(auxCondicion);

  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.scroll) {
      if (this.loading || !this.arrayObjeto || this.arrayObjeto.length <= this.arrayObjetoBuffer?.length) {
        return;
      }

      if (
        end + this.numberOfItemsFromEndBeforeFetchingMore >=
        this.arrayObjetoBuffer?.length
      ) {
        this.fetchMore();
      }
    }

  }

  private fetchMore() {
    const len = this.arrayObjetoBuffer.length;
    const more = this.arrayObjeto.slice(len, this.bufferSize + len);
    this.loading = true;
    // using timeout here to simulate backend API delay
    setTimeout(() => {
      this.loading = false;
      this.arrayObjetoBuffer = this.arrayObjetoBuffer.concat(more);
      this.arrayObjetoBufferAux = this.arrayObjetoBuffer;
    }, 30);
  }


  changeValue($event) {
    let auxValor;
    if ($event) {
      auxValor = $event.num_sec;
    } else {
      auxValor = null;
    }
    this.onTouch();
    this.onChange(auxValor);
  }

  writeValue(value: any): void {
    if (value) {
      this.currentValue = value;
    }
  }

  registerOnChange(fn: any): any {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(state: boolean): void {
    this.isDisabled = state;
  }
}
