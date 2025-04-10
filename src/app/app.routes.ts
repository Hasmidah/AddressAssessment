import { Routes } from '@angular/router';
import { CreateUpdateAddressComponent } from './component/create-update-address/create-update-address.component';
import { AddressDetailsComponent } from './component/address-details/address-details.component';
import { AppComponent } from './app.component';
import { AddressComponent } from './address/address.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'address' },
  {
    path: 'address',
    component: AddressComponent,
  },
  {
    path: 'create',
    component: CreateUpdateAddressComponent,
  },
  {
    path: 'update/:id',
    component: CreateUpdateAddressComponent
  },
  {
    path: 'addressDetails/:id',
    component: AddressDetailsComponent,
  }
];
