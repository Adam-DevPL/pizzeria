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

  describe("Calculate amount of discount", () => {
    it("Truthy - get proper discount based on voucher", () => {
      const vouchers = Vouchers.getInstance();
      const voucherName = "special";
      const discountIShouldGet = 20;
      const amountOfDiscount = vouchers.calcDiscount(voucherName);

      expect(amountOfDiscount).to.equal(discountIShouldGet);
    });
    it("Truthy - check if exist student and 10yo vouchers", () => {
      const vouchers = Vouchers.getInstance();
      const studentVoucherName = "student";
      const studentVoucherDiscount = 40;
      const voucher10yoName = "10yo";
      const voucher10yoDiscount = 10;

      const studentVoucher = vouchers.listOfVouchers.find(v => v.name === studentVoucherName);
      const voucherFor10yo = vouchers.listOfVouchers.find(v => v.name === voucher10yoName);      

      expect(studentVoucher?.name).to.equal(studentVoucherName);
      expect(studentVoucher?.discount).to.equal(studentVoucherDiscount);
      expect(voucherFor10yo?.name).to.equal(voucher10yoName);
      expect(voucherFor10yo?.discount).to.equal(voucher10yoDiscount);
    });
    it("Falsy - voucher doesn't exist in database", () => {
      const vouchers = Vouchers.getInstance();
      const voucherName = "test";
      const discountIShouldGet = 0;
      const amountOfDiscount = vouchers.calcDiscount(voucherName);

      expect(amountOfDiscount).to.equal(discountIShouldGet);
    });
  });
});
