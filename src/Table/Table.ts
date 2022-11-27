import { Validator } from "../Validator/Validator";
import { ITable } from "./ITable";

export class Table {
  private static instance: Table;
  public listOfTables: ITable[] = [];

  private constructor() {}

  public static getInstance(): Table {
    if (!Table.instance) {
      Table.instance = new Table();
    }
    return Table.instance;
  }

  private findTable(tableNo: number) {
    return this.listOfTables.find((t) => t.tableNumber === tableNo);
  }

  addNewTable(tableNumber: number, numberOfSeats: number) {
    Validator.validateNumberMoreOrEqualZero(tableNumber);
    Validator.validateNumberMoreOrEqualZero(numberOfSeats);
    const foundTable = this.listOfTables.find(
      (table) => table.tableNumber === tableNumber
    );
    if (foundTable) {
      return "Duplicated table";
    }
    this.listOfTables.push({
      tableNumber,
      numberOfSeats,
      isFree: true,
    });

    return "Table added successfully";
  }

  removeTable(tableNumber: number) {
    if (!this.findTable(tableNumber)) {
      return "Can't remove table, becasue it wasn't found";
    }
    this.listOfTables = this.listOfTables.filter(
      (table) => table.tableNumber !== tableNumber
    );

    return "Table removed successfully";
  }

  changeStatusOfTable(tableNumber: number) {
    const findTable = this.findTable(tableNumber);
    if (!findTable) {
      return "Table doesn't exist";
    }
    this.listOfTables.forEach((table) => {
      if (table.tableNumber === tableNumber) {
        table.isFree = !table.isFree;
      }
    });

    return `Table is free: ${findTable.isFree}`;
  }

  findFreeTable(seatsNo: number) {
    return this.listOfTables.find(
      (table) => table.isFree === true && table.numberOfSeats === seatsNo
    ) ?? null;
  }
}
