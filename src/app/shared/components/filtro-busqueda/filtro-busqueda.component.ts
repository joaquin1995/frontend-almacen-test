import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Filtro, ParametrosBusqueda, TOP_BUSQUEDA } from 'src/app/core';

@Component({
  selector: 'app-filtro-busqueda',
  templateUrl: './filtro-busqueda.component.html',
  styleUrls: ['./filtro-busqueda.component.scss']
})
export class FiltroBusquedaComponent implements OnInit {
  @Input() valorSeleccionado = null;
  @Input() parametroSeleccionado = null;
  @Input() cantidadMostrarSeleccionado = null;
  @Input() filtros: Filtro;
  @Output() buscar = new EventEmitter<ParametrosBusqueda>();
  private unsubscribe$: Subject<void> = new Subject();
  parametrosBusqueda: ParametrosBusqueda = {} as ParametrosBusqueda;
  constructor(  private fb: FormBuilder) {
    this.iniciarFormulario();


   }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  forma: FormGroup;
  ngOnInit(): void {
    this.valoresIniciales();
  }
  valoresIniciales() {

    if(this.filtros && this.filtros.parametros?.length > 0) {
      if(!this.filtros.top ) {
        this.filtros.top = TOP_BUSQUEDA;
      }
      const parametro = this.filtros.parametros.find(item => item.select === true);
      this.parametrosBusqueda = {
        mostrar : this.filtros.top[0],
        parametro: parametro ? parametro.value: this.filtros.parametros[0].value,
        valor: '',


      }
      console.log('setValue', this.parametrosBusqueda);
      this.forma.setValue(this.parametrosBusqueda);
      this.validarValoresSeleccionado();
      this.forma.get('mostrar').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe( mostrar => {
        console.log('change Mostrar', mostrar);
        this.forma.get('mostrar').setValue(mostrar, { emitEvent: false });
        this.buscarPaginado();
      })
    }
  }
  iniciarFormulario() {
    this.forma = this.fb.group({
      mostrar: [0],
      parametro: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ],
      valor: [
        '',
        Validators.compose([Validators.maxLength(100)])
      ]
    });


  }

  validarValoresSeleccionado(): void {
    if (this.valorSeleccionado) {
      this.forma.get('valor').setValue(this.valorSeleccionado);
    }
    if (this.parametroSeleccionado) {
      this.forma.get('mostrar').setValue(this.cantidadMostrarSeleccionado);
    }
    if (this.cantidadMostrarSeleccionado) {
      this.forma.get('parametro').setValue(this.parametroSeleccionado);
    }

  }


  buscarPaginado(){
      this.actualizarForma(this.forma.value);
      console.log('buscarPaginado', this.parametrosBusqueda, this.forma.value)
      this.buscar.emit(this.parametrosBusqueda);
  }

  actualizarForma(forma: object): void {
    Object.assign(this.parametrosBusqueda, forma);
  }
}
