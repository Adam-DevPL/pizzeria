import { Voucher } from "./Voucher";
import { VoucherDto } from "./Voucher.types";

export interface IVouchers {
  getAllVouchers: () => Map<string, Voucher>;
  addVoucher: (voucherDto: VoucherDto) => Voucher;
  calcDiscount: (voucherName: string) => number;
}
