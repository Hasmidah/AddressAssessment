import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { AddressServiceService } from '../../services/address-service.service';
import { SelectModule } from 'primeng/select';
import { State, ValidateAllFormFields } from '../../model/enum';
import { of } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { LoadingService } from '../../services/loading.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-update-address',
  imports: [CardModule, ButtonModule, CommonModule, ToolbarModule, ReactiveFormsModule, SelectModule, InputTextModule],
  templateUrl: './create-update-address.component.html',
  styleUrl: './create-update-address.component.less'
})
export class CreateUpdateAddressComponent {
  private location = inject(Location);
  private loadingService = inject(LoadingService);
  private activatedRoute = inject(ActivatedRoute);
  private addressService = inject(AddressServiceService);

  stateSelection$ = of(Object.values(State).map((state) => ({ label: state, value: state})));

  AddressFG: FormGroup;
  IsUpdate: boolean = false;
  CurrentId: string = '';


  constructor() {
    this.AddressFG = new FormGroup({
      Id: new FormControl({ value: '', disabled: true }),
      FirstName: new FormControl<string>('', [Validators.required]),
      LastName: new FormControl<string>('', [Validators.required]),
      PhoneNo: new FormControl<string | null>(null),
      Email: new FormControl<string | null>('', [Validators.email]),
      Address: new FormControl<string | null>(null),
      City: new FormControl<string>(''),
      State: new FormControl<string>(''),
      PostalCode: new FormControl<string>(''),
      Country: new FormControl<string>(''),
    })
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.CurrentId = this.activatedRoute.snapshot.params['id'];
      this.IsUpdate = true;
      this.LoadForm();
    } else {
      this.IsUpdate = false;
      this.AddressFG.get('Country')?.patchValue('Malaysia');
    }
  }

  LoadForm() {
    this.AddressFG.setValue(this.addressService.GetAddress(this.CurrentId));
  }

  SaveClick() {
    this.loadingService.start();
    if (this.AddressFG.valid) {
      if (this.IsUpdate) {
        this.AddressFG.get('Id')?.enable();
        this.AddressFG.get('Id')?.patchValue(this.CurrentId);
        this.addressService.Update(this.AddressFG.value);
        this.loadingService.stop();
        this.CancelClick();
      } else {
        this.addressService.Create(this.AddressFG.value);
        this.loadingService.stop();
        this.CancelClick();
      }
    }
    ValidateAllFormFields(this.AddressFG);
  }

  CancelClick() {
    this.location.back();
  }

}
