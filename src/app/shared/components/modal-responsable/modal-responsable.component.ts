import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertUtils, LocalStorageService, MetodosGlobales, Responsable, ResponsableInit } from '@core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AnalistaService } from 'src/app/core/services/poa/analista.service';
import { ResponsableService } from 'src/app/core/services/poa/responsable.service';

@Component({
  selector: 'app-modal-responsable',
  templateUrl: './modal-responsable.component.html',
  styleUrls: ['./modal-responsable.component.scss']
})
export class ModalResponsableComponent implements OnInit {

  public event: EventEmitter<any> = new EventEmitter();
  private unsubscribe$: Subject<void> = new Subject();
  banderaModifica = false;

  objPost: Responsable = {} as Responsable;


  forma: FormGroup;
  get f() { return this.forma.controls; }

  // arrayAdministrativo: Administrativo[] = [];

  constructor(private fb: FormBuilder,
    private alertUtils: AlertUtils,
    private metodosGlobales: MetodosGlobales,
    private localStorageService: LocalStorageService,
    private responsableService: ResponsableService) {
    this.forma = this.fb.group({
      num_sec: [0,],
      nsec_organigrama: [0],
      cargo: [null, Validators.required],
      fecha_inicio: [null, Validators.required],
      fecha_fin: [null, Validators.required],
      nsec_usuario: [0],
      estado: ['AC'],
      ci: [null],
      nombre: [null, Validators.required],
      session_db: [0],
      observacion: ['S/N'],
      telefono: [null]
    });
    this.responsableService.objResponsable
      ? this.objPost = this.responsableService.objResponsable
      : this.objPost = {} as Responsable;
    // this.localStorageService.getItem('responsable')
    //   ? this.objPost = JSON.parse(this.localStorageService.getItem('responsable'))
    //   : this.objPost = {} as Responsable;

    if (Object.keys(this.objPost).length > 0) {
      this.banderaModifica = true;
      this.objPost.fecha_inicio = this.convertirStringAFecha(this.objPost.fecha_inicio.split(' ')[0]);
      this.objPost.fecha_fin = this.convertirStringAFecha(this.objPost.fecha_fin.split(' ')[0]);
      this.forma.patchValue(this.objPost);
    } else {
      this.banderaModifica = false;
      if (this.localStorageService.getItem('nsec_organigrama')) {
        const nsec_organigrama = this.localStorageService.getItem('nsec_organigrama');
        this.forma.get('nsec_organigrama').setValue(nsec_organigrama);
      }

    }
  }

  ngOnInit(): void {

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
  guardar() {
    this.objPost = this.actualizarForma(
      this.forma.getRawValue(),
      ResponsableInit
    );
    console.log('OBJETO POST', this.objPost);

    this.responsableService
      .guardar(this.objPost)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (respuesta) => {
          // this.loadingService.changeLoading(false);
          this.alertUtils.alertOk(() => {
            this.responsableService.objResponsable = this.objPost;
            this.event.emit(true);
            // this.router.navigateByUrl("/formulario-operaciones/buscar");
            this.metodosGlobales.cerrarModal();

          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  modificar() {
    this.objPost = this.actualizarForma(
      this.forma.getRawValue(),
      ResponsableInit
    );
    console.log('OBJETO POST', this.objPost);

    this.responsableService
      .modificar(this.objPost)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (respuesta) => {
          // this.loadingService.changeLoading(false);
          this.alertUtils.alertOk(() => {
            // this.router.navigateByUrl("/formulario-operaciones/buscar");
            this.responsableService.objResponsable = this.objPost;
            this.event.emit(true);
            this.metodosGlobales.cerrarModal();

          });
        },
        (error) => {
          console.log(error);
        }
      );
  }


  actualizarForma(forma: FormGroup, interfaceInit: Responsable): Responsable {
    const inputs = Object.entries(forma).map((x) => {
      const result = this.metodosGlobales.toInterface(interfaceInit, {
        [x[0]]: x[1],
      });
      return result;
    });
    return Object.assign({}, ...inputs);
  }

  convertirStringAFecha(fecha: string): string {
    const f = new Date(fecha);
    return f.toISOString().split('T')[0];
  }


}
