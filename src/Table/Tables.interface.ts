import { Table } from "./Table";
import { TableDto } from "./Table.types";

export interface ITables {
  getAllFreeTables: () => Map<string, Table>;
  getAllOccupiedTables: () => Map<string, Table>;
  getAllTables: () => Map<string, Table>;
  addNewTable: (tableDto: TableDto) => Table;
  removeTable: (tableId: string) => boolean;
  changeStatusOfTable: (tableId: string) => boolean;
  findFreeTable: (seatsNo: number) => Table | null;
}
