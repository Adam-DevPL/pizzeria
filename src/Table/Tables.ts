import { v4 as uuid } from "uuid";

import { Validator } from "../Validator/Validator";
import { Table } from "./Table";

export class Tables {
  private static instance: Tables;
  private listOfTables: Map<string, Table> = new Map();

  private constructor() {}

  public static getInstance(): Tables {
    if (!Tables.instance) {
      Tables.instance = new Tables();
    }
    return Tables.instance;
  }

  private findTableByNumber(tableNo: number): Table | null {
    let foundTable: Table | null = null;
    this.listOfTables.forEach((table) => {
      if (table.tableNumber === tableNo) {
        foundTable = table;
        return;
      }
    });
    return foundTable;
  }

  public getAllTables(): Map<string, Table> {
    return this.listOfTables;
  }

  public getSingleTable(id: string): Table | null {
    return this.listOfTables.get(id) ?? null;
  }

  public addNewTable(tableNumber: number, numberOfSeats: number): Table | null {
    Validator.validateNumberMoreOrEqualZero(tableNumber);
    Validator.validateNumberMoreOrEqualZero(numberOfSeats);

    const foundTable = this.findTableByNumber(tableNumber);

    if (foundTable) {
      return null;
    }

    const newId = uuid();
    const newTable = new Table(newId, tableNumber, numberOfSeats);
    this.listOfTables.set(newId, newTable);

    return newTable;
  }

  public removeTable(tableId: string): boolean {
    return this.listOfTables.delete(tableId);
  }

  public changeStatusOfTable(tableId: string): boolean {
    const findTable = this.listOfTables.get(tableId);

    if (!findTable) {
      return false;
    }

    findTable.isFree = !findTable.isFree;

    return true;
  }

  public findFreeTable(seatsNo: number): Table | null {
    let foundTable: Table | null = null;
    this.listOfTables.forEach((table) => {
      if (table.numberOfSeats === seatsNo) {
        foundTable = table;
      }
    });
    return foundTable;
  }
}
