import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { CheckboxItem } from '../../../core';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckboxGroupComponent implements OnInit, OnChanges {
  @Input() options = Array<CheckboxItem>();
  @Input() selectedValues: string[];
  @Input() title: string;
  @Output() toggle = new EventEmitter<any[]>();

  // Con formularios reactivos:


  itemsForm: FormGroup;



  constructor(private fb: FormBuilder) {
    this.itemsForm = this.fb.group({
      items: this.fb.array([])
    })
  }

  // Para formulario reactivo:
  get items(): FormArray {
    return this.itemsForm.get('items') as FormArray;
  }

  ngOnInit() {
    // Para formulario reactivo:
    // TODO: cambiar por una funcion que reciba un array de valores y cambie los valores de los checkbox
    // this.itemsForm.valueChanges.subscribe(value => {

    //   console.log('valueChanges', value);
    //   const optionsChecked = new Array<any>();
    //   for (let index = 0; index < this.items.length; index++) {
    //    const isOptionChecked = this.items.get(index.toString()).value;
    //    if (isOptionChecked) {
    //     const currentOptionValue = this.options[index].value;
    //     optionsChecked.push(currentOptionValue);
    //    }
    //   }
    //   this.toggle.emit(optionsChecked);
    //  });

    this.itemsForm.valueChanges.subscribe(value => {
      console.log('valueChanges', value);
      let optionsChecked = new Array<any>();
      for (let index = 0; index < this.items.length; index++) {
         const isOptionChecked = this.items.get(index.toString()).value;
         console.log('item check', isOptionChecked);
        if (isOptionChecked) {
           const currentOptionValue = this.options[index].value;
           console.log('currentOptionValue', currentOptionValue);
           optionsChecked = [...optionsChecked, currentOptionValue];
           // optionsChecked.push(currentOptionValue);
           console.log('optionsChecked', optionsChecked);
        }
      }
      this.toggle.emit(optionsChecked);

    });
  }

  onToggle() {
    const checkedOptions = this.options.filter(x => x.checked);
    this.selectedValues = checkedOptions.map(x => x.value);
    this.toggle.emit(checkedOptions.map(x => x.value));
  }

  // TODO: REVISAR AL MODIFICAR
  ngOnChanges() {
    // if (this.selectedValues) {
    //   this.selectedValues.forEach(value => {
    //     const element = this.options.find(x => x.value === value);
    //     if (element) {
    //       element.checked = true;
    //     }
    //   });
    // }
    // Para formulario reactivo:
    if (this.items.length === 0) {
      this.options.forEach(x => {
        this.items.push(new FormControl(false));
      });
    }

    if (this.selectedValues) {
      this.selectedValues.forEach(value => {
        const index: number = this.options.findIndex(opt => opt.value === value);
        if (index >= 0) {
          this.items.get(index.toString()).setValue(true);
        }
      });
    }

  }

}
