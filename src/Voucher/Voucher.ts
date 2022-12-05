import { IVoucher } from "./IVoucher";

export class Voucher implements IVoucher {
  private _id: string;
  private _name: string;
  private _discount: number;

  constructor(id: string, name: string, discount: number) {
    this._id = id;
    this._name = name;
    this._discount = discount;
  }

  get id() {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get discount(): number {
    return this._discount;
  }
  set discount(value: number) {
    this._discount = value;
  }
}
