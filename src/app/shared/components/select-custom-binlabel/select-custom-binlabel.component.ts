import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MetodosGlobales } from '@core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { SelectCustomTemplateComponent } from '../select-custom-template/select-custom-template.component';

@Component({
  selector: 'app-select-custom-binlabel',
  templateUrl: './select-custom-binlabel.component.html',
  styleUrls: ['./select-custom-binlabel.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCustomBinlabelComponent),
      multi: true
    }
  ]

})
export class SelectCustomBinlabelComponent implements OnInit {

  @Input() arrayObjeto: any[];
  @Input() labelCustom: string;
  @Input() placeholder: string;
  @Input() formControl: FormControl;
  @Input() loading: boolean = false;


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
      this.arrayObjetoBuffer = this.arrayObjeto.filter(p => this.metodosGlobales.quitarTildesYEnesAString(p[this.labelCustom].toUpperCase()).indexOf(query) >= 0);
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
