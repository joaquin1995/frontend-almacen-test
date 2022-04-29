import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParametrosBusqueda, Filtro, Paginado, MainContainerService, MetodosGlobales, SharedDataService, AlertUtils, LoadingService, IngresosListado } from '@core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IngresosService } from 'src/app/core/services/almacen';

@Component({
  selector: 'app-ingreso-buscar',
  templateUrl: './ingreso-buscar.component.html',
  styleUrls: ['./ingreso-buscar.component.scss']
})
export class IngresoBuscarComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject();
  parametrosBusqueda: ParametrosBusqueda = {} as ParametrosBusqueda;
  filtros: Filtro = {} as Filtro;
  paginado = new Paginado();
  banderaCargando = false;
  arrayDatos: IngresosListado[] = [];
  banderaConservaBusqueda = false;
  valorSeleccionado = null;
  parametroSeleccionado = null;
  cantidadMostrarSeleccionado = null;

  constructor(
    private contenedorService: MainContainerService
    , private metodosGlobales: MetodosGlobales
    , private sharedDataService: SharedDataService
    , private router: Router
    , private alertUtils: AlertUtils
    , private loadingService: LoadingService
    , private ingresosService: IngresosService
  ) {

    this.filtros = {
      parametros: [
        { nombre: 'Tipo comprobante', value: 'i.tipo_comprobante', select: true },
        // { nombre: 'Num Sec', value: 'num_sec', select: false },
      ],
    }
    this.parametrosBusqueda = this.metodosGlobales.setParametrosBusquedaIniciales(this.filtros);
  }

  ngOnInit(): void {
    this.cargarData();
  }
  ngOnDestroy(): void {
    if (!this.banderaConservaBusqueda) {
      this.sharedDataService.changeObjBusquedaListado(null);
    }
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  cargarData() {
    this.contenedorService.cargando();
    this.sharedDataService.currentBusquedaListado
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (respuesta) => {
          let auxPaginaActual = 0;
          // let auxCantidadMostrar = 10;
          // let auxParametroBusqueda;
          // let auxValorBusqueda
          if (respuesta) {
            auxPaginaActual = respuesta.paginaActual
            this.parametrosBusqueda.mostrar = respuesta.cantidadMostrar
            this.cantidadMostrarSeleccionado = respuesta.cantidadMostrar
            this.parametroSeleccionado = respuesta.parametroBusqueda
            this.valorSeleccionado = respuesta.valorBusqueda

            this.parametrosBusqueda.parametro = this.parametroSeleccionado;
            this.parametrosBusqueda.valor = this.valorSeleccionado;
          }
          this.paginado.numeroPaginaActual = auxPaginaActual;
          this.paginado.cantidadMostrar = Number(this.parametrosBusqueda.mostrar);
          this.buscarPaginado({ offset: this.paginado.numeroPaginaActual });

          // this.parametrosBusqueda.valor,
          // this.parametrosBusqueda.parametro,
          // this.paginado.numeroPaginaActual,
          // this.parametrosBusqueda.mostrar
        },
        (error) => {
          console.log(error);
        }
      );
  }

  reload() {
    this.cargarData();
  }

  buscarFiltro(parametros: ParametrosBusqueda) {
    this.parametrosBusqueda = parametros;
    this.paginado.cantidadMostrar = Number(parametros.mostrar);
    this.buscarPaginado({ offset: 0 });
  }

  buscarPaginado(numeroPagina: any) {
    this.banderaCargando = true;
    this.paginado.numeroPaginaActual = numeroPagina.offset;
    this.ingresosService.buscarPaginado(
      this.parametrosBusqueda.valor,
      this.parametrosBusqueda.parametro,
      this.paginado.numeroPaginaActual,
      this.parametrosBusqueda.mostrar
    )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.banderaCargando = false;

        console.log(data);
        this.paginado.totalElementos = Number(data.total);
        this.paginado.cantidadMostrar = this.paginado.cantidadMostrar;
        this.arrayDatos = data.response as IngresosListado[];
        this.contenedorService.ok();
      },
        error => {
          this.banderaCargando = false;
          this.contenedorService.error();
          console.log(error);
        },
      );
  }

  modificar(row: IngresosListado): void {
    this.banderaConservaBusqueda = true;
    this.sharedDataService.changeObjBusquedaListado({
      paginaActual: this.paginado.numeroPaginaActual
      , cantidadMostrar: this.paginado.cantidadMostrar
      , parametroBusqueda: this.parametrosBusqueda.parametro
      , valorBusqueda: this.parametrosBusqueda.valor
    });
    this.sharedDataService.changeObjShared(row);
    this.router.navigateByUrl('/ingreso/modificar');
  }

  eliminar(objeto: IngresosListado) {
    this.alertUtils.alertDelete(() => {
      this.loadingService.changeLoading(true);
      this.ingresosService.eliminar(objeto.num_sec.toString())
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(respuesta => {
          this.loadingService.changeLoading(false);
          // if (!this.metodosGlobales.validaError(respuesta)) {
          //   return;
          // }
          let auxPaginaActual = this.paginado.numeroPaginaActual;
          if (this.arrayDatos.length <= 1) {
            if (this.paginado.numeroPaginaActual > 0) {
              auxPaginaActual--;
            } else {
              auxPaginaActual = 0;
            }
          }
          this.buscarPaginado({ offset: auxPaginaActual });
        }, error => {
          console.log(error);
          this.loadingService.changeLoading(false);
        });
    });
  }

  detalle(row: IngresosListado) {
    this.banderaConservaBusqueda = true;
    this.sharedDataService.changeObjBusquedaListado({
      paginaActual: this.paginado.numeroPaginaActual
      , cantidadMostrar: this.paginado.cantidadMostrar
      , parametroBusqueda: this.parametrosBusqueda.parametro
      , valorBusqueda: this.parametrosBusqueda.valor
    });
    this.sharedDataService.changeObjShared(row);
    this.router.navigateByUrl('/detalle-ingreso/buscar');
  }

  insertarDetalle(row: IngresosListado) {
    this.banderaConservaBusqueda = true;
    this.sharedDataService.changeObjBusquedaListado({
      paginaActual: this.paginado.numeroPaginaActual
      , cantidadMostrar: this.paginado.cantidadMostrar
      , parametroBusqueda: this.parametrosBusqueda.parametro
      , valorBusqueda: this.parametrosBusqueda.valor
    });
    this.sharedDataService.changeObjShared(row);
    this.router.navigateByUrl('/detalle-ingreso/nuevo');
  }

}
