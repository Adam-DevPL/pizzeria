import { v4 as uuid } from "uuid";
import { Utils } from "../Utils/Utils";

import { Validator } from "../Validator/Validator";
import { VoucherDto } from "./Voucher.types";
import { Voucher } from "./Voucher";
import { Injectable } from "../Injector/Injector.service";

@Injectable()
export class Vouchers {
  private listOfVouchers: Map<string, Voucher> = new Map();

  public getAllVouchers = (): Map<string, Voucher> => this.listOfVouchers;

  public addVoucher = ({ name, discount, weekDay }: VoucherDto): Voucher => {
    Validator.validateName(name);
    Validator.validateDiscount(discount);

    const foundVoucher: Voucher | null = this.findVoucherByName(
      name.toLowerCase()
    );

    if (foundVoucher) {
      throw new Error(`Voucher ${name} already exists`);
    }

    const newId: string = uuid();
    const newVoucher: Voucher = new Voucher(newId, name, discount, weekDay);
    this.listOfVouchers.set(newId, newVoucher);

    return newVoucher;
  };

  public calcDiscount = (voucherName: string): number => {
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
  };

  private findVoucherByName = (voucherName: string): Voucher | null => {
    const foundVoucher: Voucher | undefined = [...this.getAllVouchers()]
      .map((value) => value[1])
      .find((voucher) => voucher.name === voucherName);

    return foundVoucher ?? null;
  };
}
