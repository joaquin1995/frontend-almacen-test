import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  ViewChild
} from '@angular/core';

@Directive({
  selector: '[appOnlyDecimalNumber]'
})

export class OnlyDecimalNumberDirective {
  inputElement: HTMLElement;
  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  regexStr = '';
  @Input() OnlyDecimalNumber: boolean;
  @Input() valor: string;

  privateKeyNumber = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'numpad 0',
    'numpad 1',
    'numpad 2',
    'numpad 3',
    'numpad 4',
    'numpad 5',
    'numpad 6',
    'numpad 7',
    'numpad 8',
    'numpad 9',
    '.',
  ];

  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];
  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    console.log('key' ,e.key);
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      console.log('e.return', e.key);
      return;
    }
    // Ensure that it is a number and stop the keypress
    // if (
    //   (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
    //   (e.keyCode < 96 || e.keyCode > 105)
    // ) {
    //   e.preventDefault();
    // }

    if ( (e.shiftKey || this.privateKeyNumber.indexOf(e.key) === -1) ) {
      console.log('e.prenverDefault', e);
      e.preventDefault();
    }
  }



}
