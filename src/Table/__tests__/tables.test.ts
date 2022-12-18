import { expect } from "chai";
import { Table } from "../Table";
import { Tables } from "../Tables";

describe("Table", () => {
  describe("Adding new table to the Pizzeria", () => {
    beforeEach(() => {
      const tables = Tables.getInstance();
      tables.getAllTables().clear();
    });

    it("Truthy - added table successfully", () => {
      const tables: Tables = Tables.getInstance();
      const newTable: Table | null = tables.addNewTable(1, 1);

      let newTableNo: number = 0;
      let newTableNoSeats: number = 0;

      if (newTable) {
        const foundTable: Table | null = tables.getSingleTable(newTable.id);
        newTableNo = foundTable ? foundTable.tableNumber : 0;
        newTableNoSeats = foundTable ? foundTable.numberOfSeats : 0;
      }

      const expectedNumberOfTable = 1;
      const expectedNumberOfSeats = 1;

      expect(newTableNo).to.equal(expectedNumberOfTable);
      expect(newTableNoSeats).to.equal(expectedNumberOfSeats);
    });

    it("Falsy - throw error, number of seats is lower or equal 0", () => {
      const tables = Tables.getInstance();

      expect(function () {
        tables.addNewTable(1, 0);
      }).to.throw(Error);
    });

    it("Falsy - throw error, number of table is lower or equal 0", () => {
      const tables = Tables.getInstance();

      expect(function () {
        tables.addNewTable(-1, 1);
      }).to.throw(Error);
    });

    it("Falsy - add table with the same number - return null", () => {
      const tables = Tables.getInstance();
      tables.addNewTable(1, 1);
      const duplicateTable = tables.addNewTable(1, 1);

      expect(duplicateTable).to.null;
    });
  });

  describe("Removing table from the local", () => {
    beforeEach(() => {
      const tables = Tables.getInstance();
      tables.getAllTables().clear();
    });

    it("Truthy - table removed successfully", () => {
      const tables: Tables = Tables.getInstance();
      const newTable: Table | null = tables.addNewTable(1, 1);
      const isSuccess: boolean = newTable
        ? tables.removeTable(newTable.id)
        : false;

      const lookForTable = newTable ? tables.getSingleTable(newTable.id) : null;

      expect(isSuccess).to.true;
      expect(lookForTable).to.null;
    });

    it("Falsy - table can't be removed, becasue it doesn't exist", () => {
      const tables: Tables = Tables.getInstance();
      const isSuccess = tables.removeTable("");

      expect(isSuccess).to.false;
    });
  });

  describe("Changing status of the table - is it free or not?", () => {
    beforeEach(() => {
      const tables = Tables.getInstance();
      tables.getAllTables().clear();
    });

    it("Truthy - change status from free to oposite", () => {
      const tables: Tables = Tables.getInstance();
      const newTable: Table | null = tables.addNewTable(1, 1);

      const isSuccess: boolean = newTable
        ? tables.changeStatusOfTable(newTable.id)
        : false;
      const foundTable: Table | null = newTable
        ? tables.getSingleTable(newTable.id)
        : null;

      expect(isSuccess).to.true;
      expect(foundTable?.isFree).to.false;
    });

    it("Falsy - table doesn't exist", () => {
      const tables: Tables = Tables.getInstance();

      const isSuccess: boolean = tables.changeStatusOfTable("");

      expect(isSuccess).to.false;
    });
  });

  describe("Finding first free table with ordered number of seats", () => {
    beforeEach(() => {
      const tables = Tables.getInstance();
      tables.getAllTables().clear();
    });

    it("Truthy - found table with 4 seats", () => {
      const tables: Tables = Tables.getInstance();
      const newTable: Table | null = tables.addNewTable(1, 4);

      const numberOfSeatNeeded: number = 4;

      const foundTable: Table | null = tables.findFreeTable(numberOfSeatNeeded);

      expect(foundTable?.id).to.equal(newTable?.id);
    });

    it("Falsy - table wasn't found with 3 seats", () => {
      const tables: Tables = Tables.getInstance();
      const newTable: Table | null = tables.addNewTable(1, 4);

      const noOfSeats = 3;

      const foundTable: Table | null = tables.findFreeTable(noOfSeats);

      expect(foundTable).to.null;
    });
  });
});
