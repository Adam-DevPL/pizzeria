import { expect } from "chai";
import { VoucherDto, WeekDay } from "../IVoucher";
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
      const voucherDto: VoucherDto = {
        name: "special",
        discount: 15,
        weekDay: null,
      };
      const newVoucher: Voucher = vouchers.addVoucher(voucherDto) as Voucher;

      //then
      expect(newVoucher.name).to.equal("special");
      expect(newVoucher.discount).to.equal(15);
    });

    it("Falsy - voucher exist in database", () => {
      //given
      const vouchers = Vouchers.getInstance();
      const voucherDto: VoucherDto = {
        name: "special",
        discount: 15,
        weekDay: null,
      };
      vouchers.addVoucher(voucherDto) as Voucher;

      //when
      const existingVoucher: Voucher | null = vouchers.addVoucher(voucherDto);

      //then
      expect(existingVoucher).to.null;
    });

    it("Falsy - throw error when name is empty or discount less then zero or greater then 100", () => {
      //given
      const vouchers = Vouchers.getInstance();

      //when
      const voucherDtoNoName: VoucherDto = {
        name: "",
        discount: 5,
        weekDay: null,
      };
      const voucherDtoDiscountBelow0: VoucherDto = {
        name: "special",
        discount: -5,
        weekDay: null,
      };
      const voucherDtoDiscountBiggerThen100: VoucherDto = {
        name: "special",
        discount: 150,
        weekDay: null,
      };

      //then
      expect(function () {
        vouchers.addVoucher(voucherDtoNoName);
      }).to.throw(Error);
      expect(function () {
        vouchers.addVoucher(voucherDtoDiscountBelow0);
      }).to.throw(Error);
      expect(function () {
        vouchers.addVoucher(voucherDtoDiscountBiggerThen100);
      }).to.throw(Error);
    });
  });

  describe("Calculate amount of discount", () => {
    beforeEach(() => {
      //given
      const vouchers = Vouchers.getInstance();
      vouchers.getAllVouchers().clear();
      const voucherDto: VoucherDto = {
        name: "test",
        discount: 10,
        weekDay: null,
      };
      vouchers.addVoucher(voucherDto);
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
