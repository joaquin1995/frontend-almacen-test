import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensaje-vacio',
  templateUrl: './mensaje-vacio.component.html',
  styleUrls: ['./mensaje-vacio.component.scss']
})
export class MensajeVacioComponent implements OnInit {
  @Input() mensaje: String;

  constructor() { }

  ngOnInit(): void {
    this.mensaje = 'No se encontró ningún resultado';
  }

}
