import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GestionService, KeyStorage, ProyectoService, StorageUtils, User, UserService } from '@core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-seleccionar-proyecto',
  templateUrl: './seleccionar-proyecto.component.html',
  styleUrls: ['./seleccionar-proyecto.component.scss']
})
export class SeleccionarProyectoComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  arrayGestion: any[];
  arrayProyecto: any[];
  forma: FormGroup;
  user: User = {} as User;

  constructor(
    private fb: FormBuilder
    , private router: Router
    , private userService: UserService
    , private gestionService: GestionService
    , private proyectoService: ProyectoService
    , private storageUtils: StorageUtils
  ) {
    this.forma = this.fb.group({
      gestion: [null, Validators.required],
      nsec_proyecto: [null, Validators.required],

    });
  }

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  reload(): void {

  }

  cargarDatosIniciales() {
    this.traerDatosUsuario();
  }

  traerDatosUsuario() {
    this.forma.get('gestion').valueChanges
      .pipe(
        tap(_ => this.forma.get('nsec_proyecto').setValue(null))
        , takeUntil(this.unsubscribe$))
      .subscribe({
        next: (gestion) => {
          if (gestion) {
            this.listadoProyectoPorUsuarioGestion(gestion);
          }
        }, error: (err) => {
          console.log(err);
        }
      });

    const obj2 = this.gestionService.listadoGestionPorUsuario();
    this.userService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        this.user = user;
      });

    forkJoin([obj2])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ([gestiones]) => {
          this.arrayGestion = gestiones.response;
          console.log((gestiones as any).year);
        }, error: (err) => console.log(err)
      })

  }

  listadoProyectoPorUsuarioGestion(nsecGestion: number): void {
    this.proyectoService.listadoProyectoPorUsuarioGestion(nsecGestion)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (proyectos) => {
          this.arrayProyecto = proyectos.response;
        }, error: (err) => {
          console.log(err);
        }
      });
  }

  elegirProyecto() {
    this.forma.markAllAsTouched();
    if (!this.forma.valid) {
      return;
    }
    const formaValue = this.forma.value;
    this.storageUtils.set(KeyStorage.GESTION, formaValue.gestion);
    this.storageUtils.set(KeyStorage.PROYECTO, formaValue.nsec_proyecto);
    this.router.navigateByUrl('/');
  }


  logout() {
    // if (environment.defaultauth === 'firebase') {
    //   this.authService.logout();
    // } else {
    //   this.authFackservice.logout();
    // }
    this.router.navigate(['/login']);
  }

}
