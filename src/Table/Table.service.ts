import { v4 as uuid } from "uuid";

import { Validator } from "../Validator/Validator";
import { TableDto } from "./Table.types";
import { Table } from "./Table";
import { Injectable } from "../Injector/Injector.service";

@Injectable()
export class Tables {
  private listOfFreeTables: Map<string, Table> = new Map();
  private listOfOccupiedTables: Map<string, Table> = new Map();

  public getAllFreeTables = (): Map<string, Table> => this.listOfFreeTables;

  public getAllOccupiedTables = (): Map<string, Table> =>
    this.listOfOccupiedTables;

  public getAllTables = (): Map<string, Table> =>
    new Map<string, Table>([
      ...this.listOfFreeTables,
      ...this.listOfOccupiedTables,
    ]);

  public addNewTable = ({ tableNumber, numberOfSeats }: TableDto): Table => {
    Validator.validateNumberMoreOrEqualZero(tableNumber);
    Validator.validateNumberMoreOrEqualZero(numberOfSeats);

    const foundTable = this.findTableByNumber(tableNumber);

    if (foundTable) {
      throw new Error(`Table '${tableNumber}' already exists`);
    }

    const newId = uuid();
    const newTable = new Table(newId, tableNumber, numberOfSeats);
    this.listOfFreeTables.set(newId, newTable);

    return newTable;
  };

  public removeTable = (tableId: string): boolean =>
    this.listOfFreeTables.delete(tableId);

  public changeStatusOfTable = (tableId: string): boolean => {
    let findTable: Table | null = this.getSingleTable(tableId);

    if (!findTable) {
      throw new Error(
        `Can't change the table status, becasue it's not existing`
      );
    }

    if (!this.listOfFreeTables.get(tableId)) {
      this.listOfOccupiedTables.delete(findTable.id);
      this.listOfFreeTables.set(findTable.id, findTable);
    } else {
      this.listOfFreeTables.delete(findTable.id);
      this.listOfOccupiedTables.set(findTable.id, findTable);
    }

    return true;
  };

  public findFreeTable = (seatsNo: number): Table | null => {
    Validator.validateNumberMoreOrEqualZero(seatsNo);

    const foundTable: Table | undefined = [...this.getAllTables()]
      .map((value) => value[1])
      .find((table) => table.numberOfSeats === seatsNo);

    if (!foundTable) {
      throw new Error(`There is no free table for ${seatsNo} seat(s)`);
    }

    return foundTable;
  };

  private findTableByNumber = (tableNo: number): Table | null => {
    Validator.validateNumberMoreOrEqualZero(tableNo);

    const tmpTable: Table | undefined = [...this.getAllTables()]
      .map((value) => value[1])
      .find((table) => table.tableNumber === tableNo);

    return tmpTable ?? null;
  };

  private getSingleTable = (tableId: string): Table | null =>
    this.getAllTables().get(tableId) ?? null;
}
