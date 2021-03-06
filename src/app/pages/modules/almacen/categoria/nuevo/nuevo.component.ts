import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertUtils, LoadingService, MainContainerService, MetodosGlobales, SharedDataService } from '@core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoriasListado } from 'src/app/core/models/almacen';
import { CategoriaService } from 'src/app/core/services/almacen';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject();
  banderaModifica = false;
  forma: FormGroup;
  get f() { return this.forma.controls; }
  objPost: CategoriasListado = {} as CategoriasListado;

  constructor(
    private contenedorService: MainContainerService
    , private location: Location
    , private router: Router
    , private alertUtils: AlertUtils
    , private metodosGlobales: MetodosGlobales
    , private loadingService: LoadingService
    , private sharedDataService: SharedDataService
    , private activatedRoute: ActivatedRoute
    , private categoriaService: CategoriaService
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
                this.router.navigateByUrl('/categoria/buscar');
              } else {
                this.traerPorNumSec(respuesta as CategoriasListado);
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

  traerPorNumSec(objeto: CategoriasListado) {
    this.categoriaService.traerPorCodigo(objeto.num_sec.toString())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {

        const auxObjeto = data.response as CategoriasListado;
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
    this.categoriaService.guardar(this.objPost)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(respuesta => {
        this.loadingService.changeLoading(false);
        // if (!this.metodosGlobales.validaError(respuesta)) {
        //   return;
        // }
        this.router.navigateByUrl('/categoria/buscar');
      }, error => {
        console.log(error);
      });
  }

  modificar(): void {

    this.actualizarForma(this.forma.getRawValue());
    this.loadingService.changeLoading(true);
    this.categoriaService.modificar(this.objPost)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(respuesta => {
        this.loadingService.changeLoading(false);
        // if (!this.metodosGlobales.validaError(respuesta)) {
        //   return;
        // }
        this.router.navigateByUrl('/categoria/buscar');
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
