export interface AddressModel {
  Id: string;
  FirstName: string;
  LastName: string;
  PhoneNo: string;
  Email: string;
  Address: string;
  City: string;
  State: string;
  PostalCode: string;
  Country: string;
}

export interface CreateAddressModel {
  FirstName: string;
  LastName: string;
  PhoneNo: string;
  Email: string;
  Address: string;
  City: string;
  State: string;
  PostalCode: string;
  Country: string;
}

export interface UpdateAddressModel extends CreateAddressModel {
  Id: string;
}

export interface PagingContent<T> {
  TotalElements: number;
  Content: T[];
}

export interface SelectOption<T> {
  value: T;
  label: string;
}
