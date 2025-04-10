import { FormGroup, FormControl } from "@angular/forms";

export enum State {
  Johor = "Johor",
  Kedah = "Kedah",
  Kelantan = "Kelantan",
  Malacca = "Malacca",
  NSembilan = "N.Sembilan",
  Pahang = "Pahang",
  Penang = "Penang",
  Perak = "Perak",
  Perlis = "Perlis",
  Sabah = "Sabah",
  Sarawak = "Sarawak",
  Selangor = "Selangor",
  Terengganu = "Terengganu",
  KualaLumpur = "Kuala Lumpur",
  Putrajaya = "Putrajaya",
  Labuan = "Labuan"
}


export const ValidateAllFormFields = (formGroup: FormGroup) => {
  Object.keys(formGroup.controls).forEach((field) => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      ValidateAllFormFields(control);
    }
  });
};
