import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainContainerService, AlertUtils, MetodosGlobales, LoadingService, SharedDataService } from '@core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Ingresos, IngresosListado } from 'src/app/core/models/almacen';
import { IngresosService } from 'src/app/core/services/almacen';

@Component({
  selector: 'app-ingreso-nuevo',
  templateUrl: './ingreso-nuevo.component.html',
  styleUrls: ['./ingreso-nuevo.component.scss']
})
export class IngresoNuevoComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject();
  banderaModifica = false;
  forma: FormGroup;
  get f() { return this.forma.controls; }
  objPost: Ingresos = {} as Ingresos;

  constructor(
    private contenedorService: MainContainerService
    , private location: Location
    , private router: Router
    , private alertUtils: AlertUtils
    , private metodosGlobales: MetodosGlobales
    , private loadingService: LoadingService
    , private sharedDataService: SharedDataService
    , private activatedRoute: ActivatedRoute
    , private ingresosService: IngresosService
    , private fb: FormBuilder

  ) {
    this.forma = this.fb.group({
      num_sec: [0],
      nsec_proveedor: [3],
      nsec_ususario: [2],
      tipo_comprobante: ['', Validators.required],
      serie_comprobante: ['', Validators.required],
      num_comprobante: ['', Validators.required],
      impuesto: [13],
      total_ingresos: [null, Validators.required],
      estado: 'A'
    })
  }

  ngOnInit(): void {
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
                this.traerPorNumSec(respuesta as Ingresos);
              }
            });
        } else {
          this.contenedorService.ok();
        }
      });

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
    this.ingresosService.traerPorCodigo(objeto.num_sec.toString())
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

    this.actualizarForma(this.forma.getRawValue());
    this.loadingService.changeLoading(true);
    this.ingresosService.guardar(this.objPost)
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

  modificar(): void {

    this.actualizarForma(this.forma.getRawValue());
    this.loadingService.changeLoading(true);
    this.ingresosService.modificar(this.objPost)
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

  actualizarForma(forma: FormGroup): void {
    Object.assign(this.objPost, forma);
  }

  cancelar(): void {
    this.location.back();
  }

}
