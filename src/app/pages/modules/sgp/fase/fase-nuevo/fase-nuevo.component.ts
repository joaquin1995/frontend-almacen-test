import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MaxLengthValidator, MaxValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertUtils, Fase, FaseService, LoadingService, LocalStorageService, MainContainerService, MetodosGlobales, SharedDataService, TipoFaseDto, TipoFaseService } from '@core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-fase-nuevo',
  templateUrl: './fase-nuevo.component.html',
  styleUrls: ['./fase-nuevo.component.scss']
})
export class FaseNuevoComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  banderaModifica = false;
  forma: FormGroup;
  get f() { return this.forma.controls; }
  titulo = ' Fase';
  btnText: string;

  arrayTipoFase: TipoFaseDto []=[];
  objFase: Fase = {} as Fase;

  nsec_proyecto: number = 0;
  descripcion: string;
  nsec_estado_sgp: number;

  constructor(
    private fb: FormBuilder
    ,private alertUtils: AlertUtils
    ,private metodosGlobales: MetodosGlobales
    ,private loadingService: LoadingService
    ,private mainContainerService: MainContainerService
    ,private router: Router
    ,private activatedRoute: ActivatedRoute
    ,private localStorageService: LocalStorageService
    ,private sharedDataService: SharedDataService
    ,private tipoFaseService: TipoFaseService
    ,private faseService: FaseService

  ) {
    this.iniciarFormulario();
  }

  ngOnInit(): void {
    this.mainContainerService.cargando();
    this.btnText='Guadar';
    this.nsec_estado_sgp = 1;
    this.cargarData();

    this.get_nsec_tipo_fase.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data)=> {
        if (data) {
          console.log('valuechange tipo', data);
          this.obtenerDescripionxId(data);
        }

      });

    this.mainContainerService.ok();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  reload(): void {
    this.cargarData();
  }

  iniciarFormulario(){
    this.forma = this.fb.group({
      num_sec: 0,
      nsec_proyecto: [null, Validators.required],
      nsec_tipo_fase: [null, Validators.required],
      descripcion: [null],
      ponderacion: [null,Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])],
      ejecuta: [null],
      ejecutado: [null],
      anual_ponderacion: [null],
      anual_ejecuta: [null],
      anual_ejecutado: [null],
      programacion_egreso: [null],
      programacion_gasto: [null],
      ejecucion_egreso: [null],
      ejecucion_gasto: [null],
      nsec_estado_sgp: [null]
    })
  }

  cargarData() {
    console.log('cargar data');
    const TipoFaseDto= this.BuscarTipoFase();
    const datos = forkJoin([TipoFaseDto]);

    datos.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(data => {
      this.arrayTipoFase = data[0].response as TipoFaseDto[];
      console.log('this.arrayTipoFase', this.arrayTipoFase);
      this.controlRutas();
    });


  }

  controlRutas(): void {
    this.activatedRoute.url
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(url => {
        console.log(url);
        if (url[0].path === 'nuevo') {
          console.log(url[0].path);
          this.nsec_proyecto = Number(this.activatedRoute.snapshot.paramMap.get('nsec_proyecto'));
          this.get_nsec_proyecto.setValue(this.nsec_proyecto);
        } else {
          this.banderaModifica = true;
          this.btnText = 'Modificar';
          this.obtenerFaseId(Number(this.activatedRoute.snapshot.paramMap.get('num_sec')))
        }
      });

  }

  BuscarTipoFase() {
    return this.tipoFaseService.buscarPaginado('','t.num_sec',0,0);
  }

  obtenerFaseId( id: number): void {
    this.faseService.traerPorCodigo(id.toString())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        console.log('respuesta', res);
        this.objFase = res.response;
        this.forma.patchValue(this.objFase);
      });
  }


  validarForma(): void {
    console.log('Forma', this.forma.controls);
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

  guardar() {
    console.log('guadar', this.forma.value);
    this.actualizarForma(this.forma.getRawValue());
    this.objFase.nsec_estado_sgp = this.nsec_estado_sgp;
    this.faseService.guardar(this.objFase)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.loadingService.changeLoading(false);
        this.alertUtils.alertOk(() => {
          this.router.navigateByUrl('/fisica-plurianual');
        });
      }, error => {
        console.log(error);
      });
  }

  modificar() {
    console.log('modificar');
    this.actualizarForma(this.forma.getRawValue());
    console.log('modificar', this.forma.value);
    this.faseService.modificar(this.objFase)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.loadingService.changeLoading(false);
        this.alertUtils.alertOk(() => {
          this.router.navigateByUrl('/fisica-plurianual');
        });
      })
  }

  cancelar(): void {
    this.router.navigate(['/fisica-plurianual']);

  }

  actualizarForma(forma: FormGroup): void {
    Object.assign(this.objFase, forma);
  }

  obtenerDescripionxId(id: number) {
    const obj = this.arrayTipoFase.find(
      (x) => Number(x.num_sec) === id
    );
    this.descripcion = `${obj.descripcion}`;
    console.log(this.descripcion);
    this.get_descripcion.setValue(this.descripcion);
  }

  get get_nsec_proyecto() {
    return this.forma.get('nsec_proyecto');
  }

  get get_nsec_tipo_fase() {
    return this.forma.get('nsec_tipo_fase');
  }

  get get_descripcion() {
    return this.forma.get('descripcion');
  }

}
