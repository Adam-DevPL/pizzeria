export interface ITable {
  readonly id: string;
  readonly tableNumber: number;
  readonly numberOfSeats: number;
}


export interface TableDto {
  tableNumber: number;
  numberOfSeats: number;
}