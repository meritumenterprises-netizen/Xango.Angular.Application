import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const __VALIDATORS_TEST__ = true;

export function lessThanValidator(smallerField: string, largerField: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const smallerValue = formGroup.get(smallerField)?.value;
    const largerValue = formGroup.get(largerField)?.value;

    if (smallerValue == null || largerValue == null) {
      return null; // avoid errors before form loads
    }

    return smallerValue < largerValue ? null : { lessThan: true };
  };
}
