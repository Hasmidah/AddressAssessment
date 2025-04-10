import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToolbarModule } from 'primeng/toolbar';
import { of } from 'rxjs';
import { State, ValidateAllFormFields } from '../../model/enum';
import { AddressServiceService } from '../../services/address-service.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-address-details',
  imports: [CardModule, ButtonModule, CommonModule, ToolbarModule, ReactiveFormsModule, SelectModule, InputTextModule],
  templateUrl: './address-details.component.html',
  styleUrl: './address-details.component.less'
})
export class AddressDetailsComponent {
  private location = inject(Location);
  private activatedRoute = inject(ActivatedRoute);
  private addressService = inject(AddressServiceService);

  stateSelection$ = of(Object.values(State).map((state) => ({ label: state, value: state})));

  AddressFG: FormGroup;
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
      this.LoadForm();
    }
    this.AddressFG.disable();
  }

  LoadForm() {
    this.AddressFG.setValue(this.addressService.GetAddress(this.CurrentId));
  }

  CancelClick() {
    this.location.back();
  }

}
