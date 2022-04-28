import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MetodosGlobales } from 'src/app/core';

@Component({
  selector: 'app-select-custom',
  templateUrl: './select-custom.component.html',
  styleUrls: ['./select-custom.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCustomComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: SelectCustomComponent
    }
  ]
})
export class SelectCustomComponent implements OnInit, OnDestroy, ControlValueAccessor, OnChanges, Validator {
  @Input() arrayObjeto: any[];

  @Input() placeholder: string;
  // @Input() formControl: FormControl;
  @Input() loading: boolean = false;
  @Input() atributo: string  = 'nombre';
  valueSelect: string =''

  public input$ = new Subject<string | null>();
  private unsubscribe$: Subject<void> = new Subject();
  scroll: boolean = true;
  arrayObjetoBuffer: any[];
  arrayObjetoBufferAux: any[];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;

  control: AbstractControl;


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

  validate(control: AbstractControl): ValidationErrors {
    const value = control.value;
    this.control = control;
    return value  ? null : control.errors;
  }

  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.arrayObjeto && this.arrayObjeto.length > 0) {
      this.arrayObjetoBuffer = this.arrayObjeto.slice(0, this.bufferSize);
      const valorFormControl = this.control.value;
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
      this.arrayObjetoBuffer = this.arrayObjeto.filter(p => this.metodosGlobales.quitarTildesYEnesAString(p[this.atributo].toUpperCase()).indexOf(query) >= 0);
      this.loading = false;
    } else {
      this.scroll = true;
      this.arrayObjetoBuffer = [];
      this.arrayObjetoBuffer = this.arrayObjetoBufferAux;
      this.loading = false;
    }
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.scroll) {
      if (this.loading || this.arrayObjeto.length <= this.arrayObjetoBuffer?.length) {
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
    this.valueSelect=auxValor;
    this.onTouch();
    this.onChange(auxValor);
  }

  writeValue(value: any): void {
      this.valueSelect = value;
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
