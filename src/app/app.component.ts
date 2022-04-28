import { Component , OnInit} from '@angular/core';
import { LoadingService, UserService } from '@core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  loading = false;

  constructor(
    private spinnerService: NgxSpinnerService
    , private userService: UserService
    , private loadingService: LoadingService
  ) {

  }
  ngOnInit() {
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    this.userService.populate();
    this.loadingService.currentObjShared.subscribe({
        next: (respuesta) => {
          console.log("loading...", respuesta);
          this.loading = respuesta;
          if (this.loading) {
            this.spinnerService.show();
          } else if(!this.loading){
            this.spinnerService.hide();
          }
        }
    });
  }
}
