import { v4 as uuid } from "uuid";
import { Utils } from "../Utils/Utils";

import { Validator } from "../Validator/Validator";
import { WeekDay } from "./IVoucher";
import { Voucher } from "./Voucher";

export class Vouchers {
  private static instance: Vouchers;
  private listOfVouchers: Map<string, Voucher> = new Map();

  private costructor() {}

  public static getInstance(): Vouchers {
    if (!Vouchers.instance) {
      Vouchers.instance = new Vouchers();
    }

    return Vouchers.instance;
  }

  private findVoucherByName(name: string): Voucher | null {
    return this.listOfVouchers.get(name) ?? null;
  }

  public getAllVouchers(): Map<string, Voucher> {
    return this.listOfVouchers;
  }

  public addVoucher(
    name: string,
    discount: number,
    weekdDay: WeekDay | null = null
  ): Voucher | null {
    Validator.validateName(name);
    Validator.validateDiscount(discount);

    const foundVoucher: Voucher | null = this.findVoucherByName(
      name.toLowerCase()
    );

    if (foundVoucher) {
      return null;
    }

    const newVoucher: Voucher = new Voucher(name, discount, weekdDay);
    this.listOfVouchers.set(newVoucher.name, newVoucher);

    return newVoucher;
  }

  public calcDiscount(voucherName: string): number {
    const foundVoucher: Voucher | null = this.findVoucherByName(voucherName);
    
    if (
      !foundVoucher ||
      (foundVoucher._weekDay !== null &&
      foundVoucher._weekDay !== Utils.getDayOfWeek())
    ) {      
      return 0;
    }

    return foundVoucher._discount;
  }
}
