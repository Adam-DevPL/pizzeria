import { expect } from "chai";
import { Table } from "../src/Table/Tables";

describe("Table", () => {
  describe("Adding new table to the Pizzeria", () => {
    it("Truthy - added table successfully", () => {
      const tables = Table.getInstance();
      const returnMsg = tables.addNewTable(1, 1);
      const expectedNumberOfTable = 1;
      const expectedNumberOfSeats = 1;
      const foundTable = tables.listOfTables.find(
        (t) => t.tableNumber === expectedNumberOfTable
      );

      expect(foundTable).to.not.equal(undefined);
      expect(foundTable?.numberOfSeats).to.equal(expectedNumberOfSeats);
      expect(returnMsg).to.equal("Table added successfully");
    });
    it("Falsy - throw error, number of seats is lower or equal 0", () => {
      const tables = Table.getInstance();

      expect(function () {
        tables.addNewTable(1, 0);
      }).to.throw(Error);
    });
    it("Falsy - throw error, number of table is lower or equal 0", () => {
      const tables = Table.getInstance();

      expect(function () {
        tables.addNewTable(-1, 1);
      }).to.throw(Error);
    });
    it("Falsy - added table is duplicated", () => {
      const tables = Table.getInstance();
      const returnMsg = tables.addNewTable(1, 1);

      expect(returnMsg).to.equal("Duplicated table");
    });
  });

  describe("Removing table from the local", () => {
    it("Truthy - table removed successfully", () => {
      const tables = Table.getInstance();
      const tableNoToRemove = 1;
      const returnMsg = tables.removeTable(tableNoToRemove);
      const lookForTable = tables.listOfTables.find(
        (t) => t.tableNumber === tableNoToRemove
      );

      expect(lookForTable).to.equal(undefined);
      expect(returnMsg).to.equal("Table removed successfully");
    });
    it("Falsy - table can't be removed, becasue it doesn't exist", () => {
      const tables = Table.getInstance();
      const tableNoToRemove = 1;
      const returnMsg = tables.removeTable(tableNoToRemove);
      const lookForTable = tables.listOfTables.find(
        (t) => t.tableNumber === tableNoToRemove
      );

      expect(lookForTable).to.equal(undefined);
      expect(returnMsg).to.equal("Can't remove table, becasue it wasn't found");
    });
  });
  describe("Changing status of the table - is it free or not?", () => {
    it("Truthy - change status from free to oposite", () => {
      const tables = Table.getInstance();
      const tableIsFree = false;
      const tableNo = 1;
      const numberSeats = 1;
      tables.addNewTable(tableNo, numberSeats);

      const returnMsg = tables.changeStatusOfTable(tableNo);
      const foundTable = tables.listOfTables.find(
        (t) => t.tableNumber === tableNo
      );

      expect(foundTable?.isFree).to.false;
      expect(returnMsg).to.equal(`Table is free: ${tableIsFree}`);
    });
    it("Falsy - table doesn't exist", () => {
      const tables = Table.getInstance();
      const tableIsFree = false;
      const tableNo = 1;
      tables.removeTable(tableNo);

      const returnMsg = tables.changeStatusOfTable(tableNo);
      const foundTable = tables.listOfTables.find(
        (t) => t.tableNumber === tableNo
      );

      expect(returnMsg).to.equal("Table doesn't exist");
      expect(foundTable).to.equal(undefined);
    });
  });
  describe("Finding first free table with ordered number of seats", () => {
    it("Truthy - found table with 4 seats", () => {
      const tables = Table.getInstance();
      const tableNo = 1;
      const noOfSeats = 4;
      tables.addNewTable(tableNo, noOfSeats);

      const foundTable = tables.findFreeTable(noOfSeats);

      expect(foundTable?.numberOfSeats).to.equal(noOfSeats);
    });
    it("Falsy - table wasn't found with 3 seats", () => {
      const tables = Table.getInstance();
      const noOfSeats = 3;

      const foundTable = tables.findFreeTable(noOfSeats);

      expect(foundTable).to.null;
    });
  });
});
