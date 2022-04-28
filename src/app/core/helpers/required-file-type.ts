import { FormGroup, FormControl } from '@angular/forms';
export function requiredFileType( type: string ) {
    return function (control: FormControl) {
      const file = control.value;
      if ( file ) {
        const extension = file.name.split('.')[1].toLowerCase();
        // if ( type.toLowerCase() !== extension.toLowerCase() ) {
          if ( type.toLowerCase().indexOf(extension.toLowerCase() ) < 0 ) {
          return {
            requiredFileType: true
          };
        }
        return null;
      }
      return null;
    };
  }