import { ITable } from "./Table.types";

export class Table implements ITable {
  readonly id: string;
  readonly tableNumber: number;
  readonly numberOfSeats: number;

  constructor(id: string, tableNumber: number, numberOfSeats: number) {
    this.id = id;
    this.tableNumber = tableNumber;
    this.numberOfSeats = numberOfSeats;
  }
}
