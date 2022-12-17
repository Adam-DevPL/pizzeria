import { expect } from "chai";
import { WeekDay } from "../IVoucher";
import { Voucher } from "../Voucher";
import { Vouchers } from "../Vouchers";

describe("Voucher module", () => {
  describe("Adding a new voucher to the base", () => {
    beforeEach(() => {
      //given
      const vouchers = Vouchers.getInstance();
      vouchers.getAllVouchers().clear();
    });

    it("Truthy - added new voucher successfully", () => {
      //given
      const vouchers = Vouchers.getInstance();

      //when
      const newVoucher: Voucher = vouchers.addVoucher("special", 15) as Voucher;

      //then
      expect(newVoucher.name).to.equal("special");
      expect(newVoucher.discount).to.equal(15);
    });

    it("Falsy - voucher exist in database", () => {
      //given
      const vouchers = Vouchers.getInstance();
      vouchers.addVoucher("special", 15) as Voucher;

      //when
      const existingVoucher: Voucher | null = vouchers.addVoucher(
        "special",
        15
      );

      //then
      expect(existingVoucher).to.null;
    });

    it("Falsy - throw error when name is empty or discount less then zero or greater then 100", () => {
      //given
      const vouchers = Vouchers.getInstance();

      //then
      expect(function () {
        vouchers.addVoucher("", 10);
      }).to.throw(Error);
      expect(function () {
        vouchers.addVoucher("special", -5);
      }).to.throw(Error);
      expect(function () {
        vouchers.addVoucher("special", 101);
      }).to.throw(Error);
    });
  });

  describe("Calculate amount of discount", () => {
    beforeEach(() => {
      //given
      const vouchers = Vouchers.getInstance();
      vouchers.getAllVouchers().clear();
      vouchers.addVoucher("test", 10);
    });

    it("Truthy - get proper discount based on voucher", () => {
      //given
      const vouchers = Vouchers.getInstance();
  
      //when
      const amountOfDiscount: number = vouchers.calcDiscount("test");      

      //then
      expect(amountOfDiscount).to.equal(10);
    });

    it("Falsy - voucher doesn't exist in database", () => {
      //given
      const vouchers = Vouchers.getInstance();

      //when
      const amountOfDiscount = vouchers.calcDiscount("failure");

      //then
      expect(amountOfDiscount).to.equal(0);
    });
  });
});
