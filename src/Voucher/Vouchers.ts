import { IVoucher } from "./IVoucher";

export class Vouchers {
  private static instance: Vouchers;
  private listOfVouchers: IVoucher[] = [];

  private costructor() {
    this.listOfVouchers.push({ name: "10yo", discount: 10 });
    this.listOfVouchers.push({ name: "student", discount: 40 });
  }

  public static getInstance(): Vouchers {
    if (!Vouchers.instance) {
      Vouchers.instance = new Vouchers();
    }
    return Vouchers.instance;
  }

  public addVoucher(name: string, discount: number) {
    this.listOfVouchers.push({ name, discount });
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

    const foundVoucher = this.listOfVouchers.find(
      (voucherFromList) => voucherFromList.name === voucher
    );

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
