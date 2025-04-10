import { StorageKeys } from './../../../node_modules/angular-auth-oidc-client/lib/storage/storage-persistence.service.d';
import { CreateAddressModel, UpdateAddressModel, AddressModel } from './../model/AddressModels';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressServiceService {

  private storageKeys = 'addressList';
  private usedIdsKeys = 'usedIds';


  GetAddressList(): AddressModel[] {
    const data = localStorage.getItem(this.storageKeys);
    return data ? JSON.parse(data) : [];
  }

  GetAddress(Id: string): AddressModel {
    const addressList = this.GetAddressList();
    const details = addressList.findIndex(a => a.Id === Id);
    return addressList[details];

  }

  Create(Address: CreateAddressModel ): void {
    const addressList = this.GetAddressList();
    const id = this.generateUniqueId();
    const newAddress = { ...Address, Id: id };
    addressList.push(newAddress);
    this.saveAddress(addressList);
    this.markIdAsUsed(id);
  }

  Update (address: UpdateAddressModel): void {
    const addressList = this.GetAddressList();
    const updatedAddress = addressList.findIndex(a => a.Id === address.Id);
    if (updatedAddress !== -1) {
      addressList[updatedAddress] = address;
      this.saveAddress(addressList);
    }
  }

  Delete (Id: string) {
    const updateList =this.GetAddressList().filter(a => a.Id !== Id);
    this.saveAddress(updateList);
  }

  private saveAddress(address: AddressModel[]) {
    localStorage.setItem(this.storageKeys, JSON.stringify(address));
  }

  private generateUniqueId(): string {
    let userIds: string[] = JSON.parse(localStorage.getItem(this.usedIdsKeys) || '[]');
    let newUniqueId: string;

    //check the id is already used or not
    do {
      newUniqueId = this.uuidv4();
    } while (userIds.includes(newUniqueId));

    return newUniqueId;
  }

  private markIdAsUsed(id: string) {
    let userIds: string[] = JSON.parse(localStorage.getItem(this.usedIdsKeys) || '[]');
    userIds.push(id);
    localStorage.setItem(this.usedIdsKeys, JSON.stringify(userIds));
  }

  private uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
