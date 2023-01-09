import { IVoucher, WeekDay } from "./Voucher.types";

export class Voucher implements IVoucher {
  readonly id: string;
  readonly name: string;
  readonly discount: number;
  readonly weekDay: WeekDay | null;

  constructor(id: string, name: string, discount: number, weekdDay: WeekDay | null) {
    this.id = id;
    this.name = name;
    this.discount = discount;
    this.weekDay = weekdDay;
  }
}
