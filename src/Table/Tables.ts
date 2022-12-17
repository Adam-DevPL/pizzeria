import { v4 as uuid } from "uuid";

import { Validator } from "../Validator/Validator";
import { TableDto } from "./ITable";
import { Table } from "./Table";

export class Tables {
  private static instance: Tables;
  private listOfFreeTables: Map<string, Table> = new Map();
  private listOfOccupiedTables: Map<string, Table> = new Map();

  private constructor() {}

  public static getInstance(): Tables {
    if (!Tables.instance) {
      Tables.instance = new Tables();
    }
    return Tables.instance;
  }

  private findTableByNumber(tableNo: number): Table | null {
    Validator.validateNumberMoreOrEqualZero(tableNo);

    let tmpTable: Table | null = null;
    this.getAllTables().forEach((table) => {
      tmpTable = table.tableNumber === tableNo ? table : null;
      return;
    });

    return tmpTable;
  }

  private getSingleTable(tableId: string): Table | null {
    return this.getAllTables().get(tableId) ?? null;
  }

  public getAllFreeTables(): Map<string, Table> {
    return this.listOfFreeTables;
  }

  public getAllOccupiedTables(): Map<string, Table> {
    return this.listOfOccupiedTables;
  }

  public getAllTables(): Map<string, Table> {
    return new Map<string, Table>([
      ...this.listOfFreeTables,
      ...this.listOfOccupiedTables,
    ]);
  }

  public addNewTable({ tableNumber, numberOfSeats }: TableDto): Table | null {
    Validator.validateNumberMoreOrEqualZero(tableNumber);
    Validator.validateNumberMoreOrEqualZero(numberOfSeats);

    const foundTable = this.findTableByNumber(tableNumber);

    if (foundTable) {
      return null;
    }

    const newId = uuid();
    const newTable = new Table(newId, tableNumber, numberOfSeats);
    this.listOfFreeTables.set(newId, newTable);

    return newTable;
  }

  public removeTable(tableId: string): boolean {
    return this.listOfFreeTables.delete(tableId);
  }

  public changeStatusOfTable(tableId: string): boolean {
    let findTable: Table | null = this.getSingleTable(tableId);

    if (!findTable) {
      return false;
    }

    if (!this.listOfFreeTables.get(tableId)) {
      this.listOfOccupiedTables.delete(findTable.id);
      this.listOfFreeTables.set(findTable.id, findTable);
    } else {
      this.listOfFreeTables.delete(findTable.id);
      this.listOfOccupiedTables.set(findTable.id, findTable);
    }

    return true;
  }

  public findFreeTable(seatsNo: number): Table | null {
    Validator.validateNumberMoreOrEqualZero(seatsNo);

    let foundTable: Table | null = null;
    this.getAllTables().forEach((table) => {
      foundTable = table.numberOfSeats === seatsNo ? table : null;
      return;
    });
    return foundTable;
  }
}
