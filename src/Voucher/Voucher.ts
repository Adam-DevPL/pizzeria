import { IVoucher, WeekDay } from "./IVoucher";

export class Voucher implements IVoucher {
  readonly _name: string;
  readonly _discount: number;
  readonly _weekDay: WeekDay | null;

  constructor(name: string, discount: number, weekdDay: WeekDay | null) {
    this._name = name;
    this._discount = discount;
    this._weekDay = weekdDay;
  }

  get name(): string {
    return this._name;
  }

  get discount(): number {
    return this._discount;
  }

  get weekDay(): WeekDay | null {
    return this._weekDay;
  }
}
