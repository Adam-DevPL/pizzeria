export interface IVoucher {
  id: string;
  name: string;
  discount: number;
}

export enum SpecialVouchers  {
  discount10yo = "10yo",
  discountStudent = "student",
}