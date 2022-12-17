export interface IVoucher {
  readonly id: string;
  readonly name: string;
  readonly discount: number;
  readonly weekDay: WeekDay | null;
}

export interface VoucherDto {
  name: string;
  discount: number;
  weekDay: WeekDay | null;
}

export enum WeekDay {
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
}
