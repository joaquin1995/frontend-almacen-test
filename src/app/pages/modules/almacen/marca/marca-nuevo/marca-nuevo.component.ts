import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainContainerService, AlertUtils, MetodosGlobales, LoadingService, SharedDataService } from '@core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MarcasListado } from 'src/app/core/models/almacen';
import { MarcasService } from 'src/app/core/services/almacen';

@Component({
  selector: 'app-marca-nuevo',
  templateUrl: './marca-nuevo.component.html',
  styleUrls: ['./marca-nuevo.component.scss']
})
export class MarcaNuevoComponent implements OnInit {


  private unsubscribe$: Subject<void> = new Subject();
  banderaModifica = false;
  forma: FormGroup;
  get f() { return this.forma.controls; }
  objPost: MarcasListado = {} as MarcasListado;

  constructor(
    private contenedorService: MainContainerService
    , private location: Location
    , private router: Router
    , private alertUtils: AlertUtils
    , private metodosGlobales: MetodosGlobales
    , private loadingService: LoadingService
    , private sharedDataService: SharedDataService
    , private activatedRoute: ActivatedRoute
    , private marcasService: MarcasService
    , private fb: FormBuilder

  ) {
    this.forma = this.fb.group({
      num_sec: [0],
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
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
                this.router.navigateByUrl('/marca/buscar');
              } else {
                this.traerPorNumSec(respuesta as MarcasListado);
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

  traerPorNumSec(objeto: MarcasListado) {
    this.marcasService.traerPorCodigo(objeto.num_sec.toString())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {

        const auxObjeto = data.response as MarcasListado;
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
    this.marcasService.guardar(this.objPost)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(respuesta => {
        this.loadingService.changeLoading(false);
        // if (!this.metodosGlobales.validaError(respuesta)) {
        //   return;
        // }
        this.router.navigateByUrl('/marca/buscar');
      }, error => {
        console.log(error);
      });
  }

  modificar(): void {

    this.actualizarForma(this.forma.getRawValue());
    this.loadingService.changeLoading(true);
    this.marcasService.modificar(this.objPost)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(respuesta => {
        this.loadingService.changeLoading(false);
        // if (!this.metodosGlobales.validaError(respuesta)) {
        //   return;
        // }
        this.router.navigateByUrl('/marca/buscar');
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
