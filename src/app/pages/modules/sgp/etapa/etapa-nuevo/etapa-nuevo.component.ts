import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MaxLengthValidator, MaxValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertUtils, LoadingService, LocalStorageService, MainContainerService, MetodosGlobales, SharedDataService } from '@core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-etapa-nuevo',
  templateUrl: './etapa-nuevo.component.html',
  styleUrls: ['./etapa-nuevo.component.scss']
})
export class EtapaNuevoComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  banderaModifica = false;
  forma: FormGroup;
  get f() { return this.forma.controls; }
  titulo = ' Fase';
  btnText: string;

  objEtapa: any = {};

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
  ) {
    this.iniciarFormulario();
  }

  ngOnInit(): void {
    this.mainContainerService.cargando();
    this.btnText='Guadar';
    this.cargarData();
    this.mainContainerService.ok();
  }

  ngOnDestroy(): void {

  }

  reload(): void {
    this.cargarData();
  }

  iniciarFormulario(){
    this.forma = this.fb.group({
      num_sec: 0,
    });
  }
  cargarData() {
    console.log('cargar data');
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
  }

  modificar() {
    console.log('modificar');
  }

  cancelar(): void {
    this.router.navigate(['/fisica-plurianual']);
  }

  actualizarForma(forma: FormGroup): void {
    Object.assign(this.objEtapa, forma);
  }

}
