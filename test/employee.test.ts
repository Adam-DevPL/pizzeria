import "mocha";
import { expect } from "chai";

import { Employee } from "../src/Employees/Employees";

describe("Employee", () => {
  describe("adding new employee", () => {
    it("Truthy", () => {
      const employees = Employee.getInstance();
      employees.addNewEmployee("Adam", "waiter");
      const foundEmployee = employees.listOfEmployees.find(
        (employee) => employee.name === "Adam"
      );
      expect(foundEmployee?.name).to.equal("Adam");
    });
    it("Falsy - name is empty", () => {
      const employees = Employee.getInstance();
      const returnMsg = employees.addNewEmployee("", "chef");

      expect(returnMsg).to.equal("Employee can't be added - no name passed.");
    });
    it("Falsy - employee duplicated", () => {
      const employees = Employee.getInstance();
      employees.addNewEmployee("Adam", "chef");
      const returnMsg = employees.addNewEmployee("Adam", "chef");

      expect(returnMsg).to.equal("Duplicated employee");
    });
  });

  describe("deleting employee", () => {
    it("Truthy", () => {
      const employees = Employee.getInstance();
      employees.addNewEmployee("Adam", "waiter");
      const returnMsg = employees.removeEmployee("Adam");
      const foundEmployee = employees.listOfEmployees.find(
        (employee) => employee.name === "Adam"
      );
      expect(returnMsg).to.equal("Employee sussesfully removed");
      expect(foundEmployee).to.equal(undefined);
    });
    it("Falsy - employee wasn't found", () => {
      const employees = Employee.getInstance();
      const returnMsg = employees.removeEmployee("Andrzej");

      expect(returnMsg).to.equal("Employee wasn't found");
    });
  });
  describe("changing status of the employee", () => {
    it("Truthy - change status of the employee from true to false (not free)", () => {
      const employees = Employee.getInstance();
      employees.addNewEmployee("Adam", "waiter");
      employees.changeStatusOfEmployee("Adam");
      const foundEmployee = employees.listOfEmployees.find(
        (employee) => employee.name === "Adam"
      );
      expect(foundEmployee?.isFree).to.equal(false);
    });
    it("Falsy - employee wasn't found", () => {
      const employees = Employee.getInstance();
      const returnMsg = employees.changeStatusOfEmployee("Andrzej");

      expect(returnMsg).to.equal("Employee wasn't found");
    });
  });
  describe("finding employee by the role", () => {
    it("Truthy - finding employee who is the chef", () => {
      const employees = Employee.getInstance();
      employees.addNewEmployee("Adam", "waiter");
      employees.addNewEmployee("Dawid", "chef");

      const foundEmployee = employees.findEmployeeByRole("chef");
      expect(foundEmployee?.name).to.equal("Dawid");
    });
    it("Falsy - employee wasn't found", () => {
      const employees = Employee.getInstance();      

      const foundEmployee = employees.findEmployeeByRole("waiter");
      expect(foundEmployee).to.null;
    });
  });
});
