import { expect } from "chai";
import { table } from "console";
import { TableDto } from "../ITable";
import { Table } from "../Table";
import { Tables } from "../Tables";

describe("Table", () => {
  describe("Adding new table to the Pizzeria", () => {
    beforeEach(() => {
      const tables = Tables.getInstance();
      tables.getAllFreeTables().clear();
      tables.getAllOccupiedTables().clear();
    });

    it("Truthy - added table successfully", () => {
      //given
      const tables: Tables = Tables.getInstance();
      const tableDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };

      //when
      const newTable: Table | null = tables.addNewTable(tableDto);

      //then
      expect(newTable?.tableNumber).to.equal(1);
      expect(newTable?.numberOfSeats).to.equal(4);
    });

    it("Falsy - throw error, number of seats is lower or equal 0", () => {
      //given
      const tables = Tables.getInstance();
      const tableDto: TableDto = { tableNumber: 1, numberOfSeats: 0 };

      //when, then
      expect(function () {
        tables.addNewTable(tableDto);
      }).to.throw(Error);
    });

    it("Falsy - throw error, number of table is lower or equal 0", () => {
      //given
      const tables = Tables.getInstance();
      const tableDto: TableDto = { tableNumber: 0, numberOfSeats: 1 };

      //when, then
      expect(function () {
        tables.addNewTable(tableDto);
      }).to.throw(Error);
    });

    it("Falsy - add table with the same number - throw error", () => {
      //given
      const tables = Tables.getInstance();
      const tableDto: TableDto = { tableNumber: 1, numberOfSeats: 1 };

      //when
      tables.addNewTable(tableDto);

      //then
      expect(function () {
        tables.addNewTable(tableDto);
      }).to.throw(Error);
    });
  });

  describe("Removing table from the local", () => {
    beforeEach(() => {
      const tables = Tables.getInstance();
      tables.getAllFreeTables().clear();
      tables.getAllOccupiedTables().clear();
    });

    it("Truthy - table removed successfully", () => {
      //given
      const tables: Tables = Tables.getInstance();
      const tableDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };
      const newTable: Table = tables.addNewTable(tableDto) as Table;

      //when
      const isSuccess: boolean = tables.removeTable(newTable.id);

      //then
      expect(isSuccess).to.true;
    });

    it("Falsy - table can't be removed, becasue it doesn't exist", () => {
      //given
      const tables: Tables = Tables.getInstance();

      //when
      const isSuccess = tables.removeTable("");

      //then
      expect(isSuccess).to.false;
    });
  });

  describe("Changing status of the table - is it free or not?", () => {
    beforeEach(() => {
      const tables = Tables.getInstance();
      tables.getAllFreeTables().clear();
      tables.getAllOccupiedTables().clear();
    });

    it("Truthy - change status from free to oposite", () => {
      //given
      const tables: Tables = Tables.getInstance();
      const tableDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };
      const newTable: Table = tables.addNewTable(tableDto) as Table;

      //when
      const isSuccess: boolean = tables.changeStatusOfTable(newTable.id);
      const freeTable: Table | undefined = tables
        .getAllOccupiedTables()
        .get(newTable.id);

      //then
      expect(isSuccess).to.true;
      expect(freeTable).to.not.undefined;
    });

    it("Falsy - table doesn't exist", () => {
      //given
      const tables: Tables = Tables.getInstance();

      //then
      expect(function () {
        tables.changeStatusOfTable("");
      }).to.throw(Error);
    });
  });

  describe("Finding first free table with ordered number of seats", () => {
    beforeEach(() => {
      const tables = Tables.getInstance();
      tables.getAllFreeTables().clear();
      tables.getAllOccupiedTables().clear();
    });

    it("Truthy - found table with 4 seats", () => {
      //given
      const tables: Tables = Tables.getInstance();
      const tableDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };
      const newTable: Table = tables.addNewTable(tableDto) as Table;
      const numberOfSeatNeeded: number = 4;

      //when
      const foundTable: Table | null = tables.findFreeTable(numberOfSeatNeeded);

      expect(foundTable?.id).to.equal(newTable.id);
    });

    it("Error - when number of seats is under or equal 0", () => {
      //given
      const tables: Tables = Tables.getInstance();
      const noOfSeats = 0;

      //when, then
      expect(function () {
        tables.findFreeTable(noOfSeats);
      }).to.throw(Error);
    });

    it("Falsy - table wasn't found with 3 seats", () => {
      //given
      const tables: Tables = Tables.getInstance();
      const tableDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };
      tables.addNewTable(tableDto);
      const noOfSeats = 3;

      //then
      expect(function () {
        tables.findFreeTable(noOfSeats);
      }).to.throw(Error);
    });
  });
});
