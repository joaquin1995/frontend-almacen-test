import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MaxLengthValidator, MaxValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertUtils, LoadingService, LocalStorageService, MainContainerService, MetodosGlobales, SharedDataService } from '@core';
import { forkJoin, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-proyecto-nuevo',
  templateUrl: './proyecto-nuevo.component.html',
  styleUrls: ['./proyecto-nuevo.component.scss']
})
export class ProyectoNuevoComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject();
  banderaModifica = false;
  forma: FormGroup;
  get f() { return this.forma.controls; }
  titulo = ' Proyecto';
  btnText: string;

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
    this.btnText='Guadar'
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
      categoria_programatica: [null, Validators.required],

    })
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
    console.log('guadar');
  }

  modificar() {
    console.log('modificar');
  }

  cancelar(): void {
    // this.router.navigate(['/fisica-plurianual']);

  }

}
