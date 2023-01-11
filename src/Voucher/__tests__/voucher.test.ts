import { expect } from "chai";
import { VoucherDto, WeekDay } from "../Voucher.types";
import { Voucher } from "../Voucher";
import { Vouchers } from "../Voucher.service";

const formBaseData = (): Vouchers => {
  const vouchers = new Vouchers();
  const voucherDto: VoucherDto = {
    name: "test",
    discount: 10,
    weekDay: null,
  };
  vouchers.addVoucher(voucherDto);
  return vouchers;
};

describe("Voucher module", () => {
  describe("Adding a new voucher to the base", () => {
    // beforeEach(() => {
    //   //given
    //   const vouchers = Vouchers.getInstance();
    //   vouchers.getAllVouchers().clear();
    // });

    it("Truthy - added new voucher successfully", () => {
      //given
      const vouchers = new Vouchers();

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
      const vouchers = new Vouchers();
      const voucherDto: VoucherDto = {
        name: "special",
        discount: 15,
        weekDay: null,
      };
      vouchers.addVoucher(voucherDto) as Voucher;

      //when
      //then
      expect(function () {
        vouchers.addVoucher(voucherDto);
      }).to.throw(Error);
    });

    it("Falsy - throw error when name is empty or discount less then zero or greater then 100", () => {
      //given
      const vouchers = new Vouchers();

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
    // beforeEach(() => {
    //   //given
    //   const vouchers = Vouchers.getInstance();
    //   vouchers.getAllVouchers().clear();
    //   const voucherDto: VoucherDto = {
    //     name: "test",
    //     discount: 10,
    //     weekDay: null,
    //   };
    //   vouchers.addVoucher(voucherDto);
    // });

    it("Truthy - get proper discount based on voucher", () => {
      //given
      const vouchers = formBaseData();

      //when
      const amountOfDiscount: number = vouchers.calcDiscount("test");

      //then
      expect(amountOfDiscount).to.equal(10);
    });

    it("Falsy - voucher doesn't exist in database", () => {
      //given
      const vouchers = formBaseData();

      //when
      const amountOfDiscount = vouchers.calcDiscount("failure");

      //then
      expect(amountOfDiscount).to.equal(0);
    });
  });
});
