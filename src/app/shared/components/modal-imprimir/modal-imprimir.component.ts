import { Component, EventEmitter, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  AlertUtils,
  CategoriaProgramatica,
  CategoriaProgramaticaService,
  LocalStorageService,
  MetodosGlobales,
} from "@core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-modal-imprimir",
  templateUrl: "./modal-imprimir.component.html",
  styleUrls: ["./modal-imprimir.component.scss"],
})
export class ModalImprimirComponent implements OnInit {
  public event: EventEmitter<any> = new EventEmitter();
  private unsubscribe$: Subject<void> = new Subject();
  banderaModifica = false;

  forma: FormGroup;
  get f() {
    return this.forma.controls;
  }
  arraycategoriaProgramatica: CategoriaProgramatica[] = [];

  // arrayTipoIndicador: PoaTipoIndicador[] = [];
  titulo: string = "Categoria Programatica";

  constructor(
    private fb: FormBuilder,
    private alertUtils: AlertUtils,
    private categoriaProgramaticaService: CategoriaProgramaticaService,
    private localStorageService: LocalStorageService,
    private metodosGlobales: MetodosGlobales
  ) {
    this.forma = this.fb.group({
      // num_sec: [0],
      // nsec_maestro_fun: [null, Validators.required],
      nsec_categoria_programatica: [null, Validators.required],
    });
    // this.localStorageService.setItem('nsec_maestro', this.objMaestroFun.num_sec.toString());

    if (this.localStorageService.getItem("nsec_maestro") != null) {
      this.obtenerCategoriaProgramatica(
        this.localStorageService.getItem("nsec_maestro")
      );
      // this.forma.get('num_sec').setValue(this.localStorageService.getItem('nsec_maestro'));
      // this.obtenerCategoriaProgramatica(this.localStorageService.getItem('nsec_maestro'));
    }
  }

  ngOnInit(): void { }

  validarForma() {
    this.forma.markAllAsTouched();
    if (!this.forma.valid) {
      return;
    }
    // this.alertUtils.alertOk(() => {
    //   this.event.emit(true);
    //   this.metodosGlobales.cerrarModal();
    //   this.localStorageService.setItem("nsec_categoria_programatica", this.forma.value.nsec_categoria_programatica);
    // });
      this.localStorageService.setItem("nsec_categoria_programatica", this.forma.value.nsec_categoria_programatica);
      this.event.emit(true);
      this.metodosGlobales.cerrarModal();

  }

  obtenerCategoriaProgramatica(num_sec: number) {
    this.categoriaProgramaticaService
      .traerPorCodigoMaestroFun(num_sec.toString())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res.status == "success") {
          this.arraycategoriaProgramatica = res.response;
        }
        console.log("categoriaProgramatica", res);
        // this.containerService.ok();
      });
  }
}
