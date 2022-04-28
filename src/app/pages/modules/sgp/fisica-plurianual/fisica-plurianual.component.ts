import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fisica-plurianual',
  templateUrl: './fisica-plurianual.component.html',
  styleUrls: ['./fisica-plurianual.component.scss']
})
export class FisicaPlurianualComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  nuevaFase(): void {
    this.router.navigate([`/fase/nuevo/1`]);
  }

  modificarFase() {
    console.log('modificar fase');
    this.router.navigateByUrl(`/fase/modificar/3`);
  }

}
