import { FormControl } from '@angular/forms';

export function nameValidator(control: FormControl) {
    const forbidden = /[^a-zA-Z\s]/.test(control.value);
    return forbidden ? { name: { value: control.value } } : null;
}

