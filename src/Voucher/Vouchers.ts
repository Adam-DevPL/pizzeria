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

  private findVoucherByName(voucherName: string): Voucher | null {
    let foundVoucher: Voucher | null = null;
    this.getAllVouchers().forEach((voucher) => {
      if (voucher.name === voucherName) {
        foundVoucher = voucher;
      }
    });
    return foundVoucher;
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

    const newId: string = uuid();
    const newVoucher: Voucher = new Voucher(newId, name, discount, weekdDay);
    this.listOfVouchers.set(newId, newVoucher);

    return newVoucher;
  }

  public calcDiscount(voucherName: string): number {
    Validator.validateName(voucherName);

    const foundVoucher: Voucher | null = this.findVoucherByName(
      voucherName.toLowerCase()
    );

    if (
      !foundVoucher ||
      (foundVoucher.weekDay !== null &&
        foundVoucher.weekDay !== Utils.getDayOfWeek())
    ) {
      return 0;
    }

    return foundVoucher.discount;
  }
}
