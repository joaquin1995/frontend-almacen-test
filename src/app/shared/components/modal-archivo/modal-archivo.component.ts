import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertUtils, LoadingService, MetodosGlobales } from '@core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArchivoService } from 'src/app/core/services/poa/archivo.service';

@Component({
  selector: 'app-modal-archivo',
  templateUrl: './modal-archivo.component.html',
  styleUrls: ['./modal-archivo.component.scss']
})
export class ModalArchivoComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject();
  forma: FormGroup
  // titulo: string = "Registrar/Modificar Archivo Digital";
  get f() { return this.forma.controls; }

  // despachada: ListaDespachadaPorArea;
  // recibida : RecibidaListado;
  nsec_archivo: string;
  nombre_archivo: string;
  nsec_archivo_adjunto: string;
  nombre_archivo_adjunto: string;
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public bsModalRef: BsModalRef,
    private metodosGlobales: MetodosGlobales,
    private loadingService: LoadingService,
    private router: Router,
    private alertUtils: AlertUtils,
    private archivoService: ArchivoService
    // private despachoService : CorDespachoService,
    // private recibidaService : RecibidaService
  ) {
    this.forma = new FormGroup({
      'nombre': new FormControl(null, Validators.required),
      'archivo': new FormControl(null)
      // 'archivo': new FormControl(null, Validators.required),
      // 'archivo_adjunto': new FormControl(null)
    })
  }

  ngOnInit(): void {
    if (this.nombre_archivo) {
      this.forma.controls['archivo'].clearValidators();
      // this.forma.controls['archivo'].setValidators(Validators.required)
    }
    console.log('ARHICO: ' + this.nombre_archivo)
  }


  validarForma(): void {

  }


  validar() {

    this.forma.markAllAsTouched();
    if (!this.forma.valid) {
      return;
    }
    // Para guardar con los requisitos tambien
    const formData = new FormData();
    const archivo = this.forma.get('archivo').value;
    // const archivoAdjunto = this.forma.get('archivo_adjunto').value;
    if (!archivo) {
      this.alertUtils.alertCustom('Ningún archivo a subir', null, 'warning');
      return;
    }
    if (archivo) {
      formData.append(`archivo`, archivo);
    }
    // if (archivoAdjunto) {
    //   // formData.append(`array_archivos`, archivoAdjunto, (EnumNsecTipoArchivo.ADJUNTO + archivoAdjunto.name));
    // }
    // const file = archivoNota.value;
    // const fileAdjunto = archivoAdjunto.value;
    // formData.append(`nombre`, this.forma.get('nombre').value);
    // formData.append(`nsec_usuario`, '0');

    this.alertUtils.alertQuestion(() => {
      //  if(this.despachada != null){
      this.guardar(formData);
      //  }else if(this.recibida != null){
      //    this.guardarRecibida(formData);
      //  }
    });
  }
  guardar(formData: FormData) {
    console.log('GUARDAR', formData);

    this.loadingService.changeLoading(true);
    this.archivoService.guardarArchivo(this.metodosGlobales.toFormData({
      nsec_tipo_formulario: this.archivoService.objDetArchivo.nsec_tipo_formulario,
      nsec_formulario: this.archivoService.objDetArchivo.nsec_formulario,
      nombre: this.forma.get('nombre').value,
      nsec_usuario: 0
    }, formData))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(respuesta => {
        this.loadingService.changeLoading(false);
        console.log(respuesta);
        this.alertUtils.alertOk(() => {
          this.event.emit(true);
          this.forma.reset();
          this.bsModalRef.hide();
        });
      }, error => {
        this.loadingService.changeLoading(false);
        console.log(error);
        //this.loading = false;
      });
  }


  traerArhivoPorNombre(nombreArchivo: string) {
    // this.metodosGlobales.traerArchivoPorNombre(nombreArchivo);
  }


  modificarArchivo() {
    this.nombre_archivo = null;
    this.nsec_archivo = null;
    // this.forma.controls['archivo'].setValidators(Validators.required);
  }



  get nsecArchivoValido() {
    return this.forma.get('archivo').invalid && this.forma.get('archivo').touched;
  }

}
