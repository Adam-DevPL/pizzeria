import { expect } from "chai";
import { Vouchers } from "../src/Voucher/Vouchers";

describe("Voucher module", () => {
  describe("Adding a new voucher to the base", () => {
    it("Truthy - added new voucher successfully", () => {
      const vouchers = Vouchers.getInstance();
      const voucherName = "special";
      const discountAmount = 20;
      const properMsg = `Voucher ${voucherName} added successfully`;

      const returnMsg = vouchers.addVoucher(voucherName, discountAmount);

      const foundVoucher = vouchers.listOfVouchers.find(
        (v) => v.name === voucherName
      );

      expect(foundVoucher?.name).to.equal(voucherName);
      expect(returnMsg).to.equal(properMsg);
    });
    it("Falsy - voucher exist in database", () => {
      const vouchers = Vouchers.getInstance();
      const voucherName = "special";
      const discountAmount = 20;
      const properMsg = `This voucher ${voucherName} exist in database`;

      const returnMsg = vouchers.addVoucher(voucherName, discountAmount);

      expect(returnMsg).to.equal(properMsg);
    });
    it("Falsy - throw error when name is empty or discount less then zero or greater then 100", () => {
      const vouchers = Vouchers.getInstance();
      const badVoucherName = "";
      const properVoucherName = "test";
      const badDiscountAmount = -1;
      const properDiscountAmount = 50;

      expect(function () {
        vouchers.addVoucher(badVoucherName, properDiscountAmount);
      }).to.throw(Error);
      expect(function () {
        vouchers.addVoucher(properVoucherName, badDiscountAmount);
      }).to.throw(Error);
    });
  });
});
