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
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}
