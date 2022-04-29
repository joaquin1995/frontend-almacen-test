import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ingresos, MainContainerService, AlertUtils, MetodosGlobales, LoadingService, SharedDataService, DetalleIngresosService, DetalleIngresos, ProductosListado, ProductosService } from '@core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-ingreso-nuevo',
  templateUrl: './detalle-ingreso-nuevo.component.html',
  styleUrls: ['./detalle-ingreso-nuevo.component.scss']
})
export class DetalleIngresoNuevoComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject();
  banderaModifica = false;
  forma: FormGroup;
  get f() { return this.forma.controls; }
  objPost: DetalleIngresos = {} as DetalleIngresos;
  arrayProductos: ProductosListado[] = [];
  objIngreso = {} as Ingresos;

  name: string = '';

  setValue() {
    this.name = 'Nancy';
  }

  constructor(
    private contenedorService: MainContainerService
    , private location: Location
    , private router: Router
    , private alertUtils: AlertUtils
    , private metodosGlobales: MetodosGlobales
    , private loadingService: LoadingService
    , private sharedDataService: SharedDataService
    , private activatedRoute: ActivatedRoute
    , private detalleIngresosService: DetalleIngresosService
    , private productosService: ProductosService
    , private fb: FormBuilder

  ) {
    // num_sec: number;
    // nsec_ingreso: number;
    // nsec_producto: number;
    // cantidad: number;
    // precio: number;
    this.forma = this.fb.group({
      num_sec: [0],
      nsec_ingreso: [0],
      nsec_producto: [null, Validators.required],
      cantidad: [null, Validators.required],
      precio: [null, Validators.required],
      ganancias: [25]

    })
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.cargarData();
  }

  ngOnDestroy(): void {
    this.sharedDataService.changeObjShared(null);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  cargarData(): void {

    this.contenedorService.cargando();
    this.activatedRoute.url
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(url => {
        if (url[0].path === 'modificar') {
          this.banderaModifica = true;
          this.sharedDataService.currentObjShared
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(respuesta => {
              if (!respuesta) {
                this.router.navigateByUrl('/ingreso/buscar');
              } else {
                this.objIngreso = respuesta as Ingresos;
                this.traerPorNumSec(respuesta as Ingresos);
              }
            });
        } else {
          this.contenedorService.ok();
          this.sharedDataService.currentObjShared
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(respuesta => {
              if (!respuesta) {
                this.router.navigateByUrl('/ingreso/buscar');
              } else {
                this.objIngreso = respuesta as Ingresos;
              }
            });
        }
      });
    this.forma.get('nsec_ingreso').setValue(this.objIngreso.num_sec);
  }

  reload(): void {
    this.cargarData();
  }

  validarForma(): void {
    console.log('FORMAA CONTROLS', this.forma.controls);
    this.forma.markAllAsTouched();
    if (!this.forma.valid) {
      return;
    }
    this.alertUtils.alertQuestion(() => {
      if (this.banderaModifica === true) {
        this.modificar();
      } else {
        this.guardar();
      }
    });
  }

  traerPorNumSec(objeto: Ingresos) {
    this.detalleIngresosService.traerPorCodigo(objeto.num_sec.toString())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {

        const auxObjeto = data.response as Ingresos;
        this.forma.patchValue(auxObjeto);
        this.contenedorService.ok();
      }, error => {
        this.contenedorService.error();
        console.log(error);
      });
  }

  guardar(): void {

    const obj = this.arrayProductos.find(x => x.num_sec === Number(this.forma.get('nsec_producto').value));
    console.log(obj);
    if (obj.precio_venta === 0) {
      obj.precio_venta =
        ((this.forma.get('precio').value * this.forma.get('ganancias').value) / 100) +
        ((this.forma.get('precio').value)) +
        ((this.forma.get('precio').value * this.objIngreso.impuesto) / 100);
      obj.stock = obj.stock + Number(this.forma.get('cantidad').value);
    } else {
      obj.stock = obj.stock + Number(this.forma.get('cantidad').value);
    }

    console.log(obj);


    this.actualizarForma(this.forma.getRawValue());
    this.loadingService.changeLoading(true);
    this.detalleIngresosService.guardar(this.objPost)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(respuesta => {
        this.loadingService.changeLoading(false);
        // if (!this.metodosGlobales.validaError(respuesta)) {
        //   return;
        // }
        this.productosService.modificar(obj)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(respuesta => {
            this.router.navigateByUrl('/ingreso/buscar');

          })
      }, error => {
        console.log(error);
      });
  }

  modificar(): void {

    this.actualizarForma(this.forma.getRawValue());
    this.loadingService.changeLoading(true);
    this.detalleIngresosService.modificar(this.objPost)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(respuesta => {
        this.loadingService.changeLoading(false);
        // if (!this.metodosGlobales.validaError(respuesta)) {
        //   return;
        // }
        this.router.navigateByUrl('/ingreso/buscar');
      }, error => {
        console.log(error);
      });
  }

  obtenerProductos() {
    this.productosService.buscarPaginado('', 'p.nombre', 0, 0)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.arrayProductos = res.response;
        console.log('ARRAY PRODUCTOS', this.arrayProductos);

      })
  }

  actualizarForma(forma: FormGroup): void {
    Object.assign(this.objPost, forma);
  }

  cancelar(): void {
    this.location.back();
  }

}
