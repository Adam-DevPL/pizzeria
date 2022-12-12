export interface IVoucher {
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
