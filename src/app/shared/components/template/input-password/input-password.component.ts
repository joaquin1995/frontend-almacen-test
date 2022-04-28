import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputPasswordComponent
    }
  ]
})
export class InputPasswordComponent implements OnInit,  ControlValueAccessor, Validator {

  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() autocomplete: string ="off"
  texto: string = '';
  control: AbstractControl;
  isDisabled: boolean = false;
  showPassword = false;
  passwordIcon = 'bx bx-show';

  onChange = (_: any) => {};
  onTouch = () => {};
  constructor() { }

  // registerOnValidatorChange?(fn: () => void): void {
  //   console.log('registerOnValidatorChange.');
  // }

  // changeText($event: any) {
  //   console.log($event.target.value);
  //   this.texto = $event.target.value;
  //   this.onTouch();
  //   this.onChange(this.texto);
  // }
  changeText(value: string) {
    // console.log(value);
    this.texto = value;
    this.onTouch();
    this.onChange(this.texto);
  }
  writeValue(value: string): void {
    this.texto = value;
  }
  registerOnChange(fn: any): void {
     this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
     this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  validate(control: AbstractControl): ValidationErrors {
    const value = control.value;
    this.control = control;
    return value  ? null : control.errors;

    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {

  }
  togglePasswordMode() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.passwordIcon = 'bx bx-hide';
    } else {
      this.passwordIcon = 'bx bx-show';
    }
  }
  get hasLabel(): boolean {
    return this.label.length > 0;
  }

}
