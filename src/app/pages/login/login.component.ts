import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertUtils, LoadingService, UserService } from '@core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
/**
 * Login-2 component
 */
export class LoginComponent implements OnInit {

  forma: FormGroup;
  get f() { return this.forma.controls; }

  showPassword = false;
  passwordIcon = 'bx bx-show';
  errorLoginText = null;

  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder
    , private router: Router
    , private userService: UserService
    , private loadingService: LoadingService
    , private alertUtils: AlertUtils
  ) {
    this.forma = this.formBuilder.group({
      cuenta: [null, Validators.compose([Validators.required])],
      contrasena: [null, Validators.compose([Validators.required])],
    });
    console.log('LoginComponent constructor');
  }

  ngOnInit(): void {
    this.userService.purgeAuth();
  }

  onSubmit() {
    console.log(this.f);
    this.forma.markAllAsTouched();
    if (!this.forma.valid) {
      return;
    }
    this.loadingService.changeLoading(true);
    const user = this.forma.value;
    user.cuenta = user.cuenta.trim();
    user.contrasena = user.contrasena.trim();
    console.log(user);
    this.userService.attemptAuth(user).subscribe(
      {
        next: () => {
          this.loadingService.changeLoading(false);
          this.errorLoginText = null;
          this.router.navigateByUrl("/area-trabajo/seleccionar");
          // this.router.navigateByUrl("/");
        },
        error: (error) => {
          console.log('Error login', error);
          this.loadingService.changeLoading(false);
          this.alertUtils.alertToast(error.message, 'error');
        }
      }
    );
  }
  togglePasswordMode() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.passwordIcon = 'bx bx-hide';
    } else {
      this.passwordIcon = 'bx bx-show';
    }
  }



}
