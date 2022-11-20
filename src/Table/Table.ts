import { ITable } from "./ITable";

export class Table {
  private static instance: Table;
  private listOfTables: ITable[] = [];

  private constructor() {}

  public static getInstance(): Table {
    if (!Table.instance) {
      Table.instance = new Table();
    }
    return Table.instance;
  }

  addNewTable(tableNumber: number, numberOfSeats: number) {
    const foundTable = this.listOfTables.find(
      (table) => table.tableNumber === tableNumber
    );
    if (foundTable) {
      return "Duplicate table";
    }
    this.listOfTables.push({
      tableNumber,
      numberOfSeats,
      isFree: true,
    });

    return "Table added successfully";
  }

  removeTable(tableNumber: number) {
    this.listOfTables = this.listOfTables.filter(
      (table) => table.tableNumber !== tableNumber
    );
  }

  changeStatusOfTable(tableNumber: number) {
    this.listOfTables.forEach((table) => {
      if (table.tableNumber === tableNumber) {
        table.isFree = !table.isFree;
      }
    });
  }
}
