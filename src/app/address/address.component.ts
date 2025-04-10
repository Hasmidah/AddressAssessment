import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AddressServiceService } from '../services/address-service.service';
import { Router } from '@angular/router';
import { AddressModel } from '../model/AddressModels';
import { ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-address',
  imports: [CommonModule, CardModule, TableModule, TooltipModule, ButtonModule, ReactiveFormsModule, DividerModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.less'
})
export class AddressComponent {

  private addressService = inject(AddressServiceService);
  private router = inject(Router);

  addressList = signal<AddressModel[]>([]);

  ngOnInit(): void {
    this.LoadData();
  }

  LoadData() {
    this.addressList.set(this.addressService.GetAddressList());
  }


  AddClick() {
    this.router.navigate(['/create']);
  }

  ViewClick(id: string) {
    this.router.navigate([`/addressDetails/${id}`]);
  }

  Delete( id: string) {
    this.addressService.Delete(id);
    this.LoadData();
  }

  UpdateAddress (id: string) {
    this.router.navigate([`/update/${id}`]);
  }

}
