import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  @Input() mensaje: string;
  @Output() recargarChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  recargar(): void {
    this.recargarChange.emit();
  }

}
