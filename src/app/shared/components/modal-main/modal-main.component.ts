import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MetodosGlobales } from '@core';

@Component({
  selector: 'app-modal-main',
  templateUrl: './modal-main.component.html',
  styleUrls: ['./modal-main.component.scss']
})
export class ModalMainComponent implements OnInit {
  @Input() tituloModal: string;
  @Input() iconoTitulo: string;
  @Output() funcionAceptar = new EventEmitter();

  constructor(
    private metodosGlobales: MetodosGlobales
  ) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.metodosGlobales.cerrarModal();
  }

}
