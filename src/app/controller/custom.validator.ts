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

export function noSpecialCharactersValidator(control: FormControl) {
  if (control.value) {
    const pattern = /^[a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ ]*$/;
    if (!pattern.test(control.value)) {
      return { specialCharacters: true };
    }
  }
  return null;
}
