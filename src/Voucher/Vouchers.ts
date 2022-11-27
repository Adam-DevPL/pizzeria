import { Validator } from "../Validator/Validator";
import { IVoucher } from "./IVoucher";

export class Vouchers {
  private static instance: Vouchers;
  listOfVouchers: IVoucher[] = [];

  private costructor() {}

  public static getInstance(): Vouchers {
    if (!Vouchers.instance) {
      Vouchers.instance = new Vouchers();
      Vouchers.instance.listOfVouchers.push({ name: "10yo", discount: 10 });
      Vouchers.instance.listOfVouchers.push({ name: "student", discount: 40 });
    }
    return Vouchers.instance;
  }

  private findVoucher(name: string): IVoucher | null {
    return this.listOfVouchers.find((v) => v.name === name) ?? null;
  }

  public addVoucher(name: string, discount: number) {
    Validator.validateName(name);
    Validator.validateDiscount(discount);
    if (this.findVoucher(name)) {
      return `This voucher ${name} exist in database`;
    }
    this.listOfVouchers.push({ name, discount });

    return `Voucher ${name} added successfully`;
  }

  public calcDiscount(voucher: string | null = null): number {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (!voucher) {
      return 0;
    }

    const d = new Date();
    const currentDay = weekday[d.getDay()];

    const foundVoucher = this.findVoucher(voucher);

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
