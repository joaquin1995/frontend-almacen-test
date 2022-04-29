import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MainContainerService, AlertUtils, MetodosGlobales, LoadingService, SharedDataService } from '@core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoriasListado, MarcasListado, Productos, ProductosListado } from 'src/app/core/models/almacen';
import { CategoriaService, MarcasService, ProductosService } from 'src/app/core/services/almacen';
import { v1 as uuidv1 } from 'uuid';

@Component({
  selector: 'app-producto-nuevo',
  templateUrl: './producto-nuevo.component.html',
  styleUrls: ['./producto-nuevo.component.scss']
})
export class ProductoNuevoComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject();
  banderaModifica = false;
  forma: FormGroup;
  get f() { return this.forma.controls; }
  objPost: Productos = {} as Productos;
  arrayCategorias: CategoriasListado[] = [];
  arrayMarcas: MarcasListado[] = [];

  constructor(
    private contenedorService: MainContainerService
    , private location: Location
    , private router: Router
    , private alertUtils: AlertUtils
    , private metodosGlobales: MetodosGlobales
    , private loadingService: LoadingService
    , private sharedDataService: SharedDataService
    , private activatedRoute: ActivatedRoute
    , private productosService: ProductosService
    , private marcasService: MarcasService
    , private categoriasService: CategoriaService
    , private fb: FormBuilder

  ) {

    this.forma = this.fb.group({
      num_sec: [0],
      nsec_categoria: [null, Validators.required],
      nsec_marca: [null, Validators.required],
      codigo: [uuidv1().slice(0, 15), Validators.required],
      ruta: ['ruta/img'],
      nombre: [null, Validators.required],
      precio_venta: [0, Validators.required],
      descripcion: [null, Validators.required],
      estado: 'A'
    });
    this.forma.get('precio_venta').disable();
  }
  ngOnInit(): void {

    const obtenerCategorias = this.obtenerCategorias();
    const obtenerMarcas = this.obtenerMarcas();

    const datos = forkJoin([obtenerCategorias, obtenerMarcas])
    datos.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => {
        console.log(data);
        this.arrayCategorias = data[0].response;
        this.arrayMarcas = data[1].response;
        this.cargarData();
        // this.controlRutas();
        // this.inicializar();
      }
    );

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
                this.router.navigateByUrl('/producto/buscar');
              } else {
                this.traerPorNumSec(respuesta as Productos);
              }
            });
        } else {
          this.contenedorService.ok();
        }
      });


  }

  traerPorNumSec(objeto: Productos) {
    this.productosService.traerPorCodigo(objeto.num_sec.toString())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        const auxObjeto = data.response as Productos;
        this.forma.patchValue(auxObjeto);
        this.contenedorService.ok();
      }, error => {
        this.contenedorService.error();
        console.log(error);
      });
  }

  obtenerCategorias() {
    return this.categoriasService.buscarPaginado('', 'c.nombre', 0, 0)
  }
  obtenerMarcas() {
    return this.marcasService.buscarPaginado('', 'm.nombre', 0, 0)
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

  modificar(): void {

    this.actualizarForma(this.forma.getRawValue());
    this.loadingService.changeLoading(true);
    console.log('objt', this.objPost);

    this.productosService.modificar(this.objPost)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(respuesta => {
        this.loadingService.changeLoading(false);
        // if (!this.metodosGlobales.validaError(respuesta)) {
        //   return;
        // }
        this.router.navigateByUrl('/producto/buscar');
      }, error => {
        console.log(error);
      });
  }

  guardar(): void {

    this.actualizarForma(this.forma.getRawValue());
    this.loadingService.changeLoading(true);
    this.productosService.guardar(this.objPost)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(respuesta => {
        this.loadingService.changeLoading(false);
        // if (!this.metodosGlobales.validaError(respuesta)) {
        //   return;
        // }
        this.router.navigateByUrl('/producto/buscar');
      }, error => {
        console.log(error);
      });
  }

  actualizarForma(forma: FormGroup): void {
    Object.assign(this.objPost, forma);
  }

  reload() {
    // location.reload();
  }


  cancelar() {
  }

}
