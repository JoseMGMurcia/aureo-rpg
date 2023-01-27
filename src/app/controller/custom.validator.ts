import { FormControl } from "@angular/forms";

export class AureoValidators {
  static genderValidator(control: FormControl) {
    const value = control.value ? control.value.toUpperCase().trim() : '';
    if (value !== 'F' && value !== 'M' &&  value !== '') {
      return { gender: true };
    }
    return null;
  }
}
