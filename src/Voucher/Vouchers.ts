import {v4 as uuid} from "uuid";

import { Validator } from "../Validator/Validator";
import { IVoucher } from "./IVoucher";
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

  private findVoucher(voucherId: string): Voucher | null {
    return this.listOfVouchers.get(voucherId) ?? null;
  }

  private findVoucherByName(name: string): Voucher | null {
    let foundVoucher: Voucher | null = null;
    this.listOfVouchers.forEach((voucher) => {
      if (voucher.name === name) {
        foundVoucher = voucher;
        return;
      }
    });
    return foundVoucher;
  }

  public addVoucher(name: string, discount: number): Voucher | null {
    Validator.validateName(name);
    Validator.validateDiscount(discount);

    const foundVoucher: Voucher | null= this.findVoucherByName(name);

    if (foundVoucher) {
      return null;
    }

    const newId: string = uuid();
    const newVoucher: Voucher = new Voucher(newId, name, discount);
    this.listOfVouchers.set(newId, newVoucher);

    return newVoucher;
  }

  public calcDiscount(voucherName: string = ""): number {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (!voucherName) {
      return 0;
    }

    const d = new Date();
    const currentDay = weekday[d.getDay()];

    const foundVoucher: Voucher | null = this.findVoucherByName(voucherName);

    if (!foundVoucher) {
      return 0;
    }

    if (foundVoucher.name === "10yo" && currentDay === "Tuesday") {
      return foundVoucher.discount;
    }

    if (foundVoucher.name === "student" && currentDay === "Thursday") {
      return foundVoucher.discount;
    }

    if (foundVoucher) {
      return foundVoucher.discount;
    }

    return 0;
  }
}
