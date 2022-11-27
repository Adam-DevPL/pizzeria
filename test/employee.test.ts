import "mocha";
import { expect } from "chai";

import { Employee } from "../src/Employee/Employee";

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
  });
  
  it("deleting employee", () => {
    const employees = Employee.getInstance();
    employees.addNewEmployee("Adam", "waiter");
    employees.removeEmployee("Adam");
    const foundEmployee = employees.listOfEmployees.find(
      (employee) => employee.name === "Adam"
    );
    expect(foundEmployee).to.equal(undefined);
  });
  it("changing status of the employee", () => {
    const employees = Employee.getInstance();
    employees.addNewEmployee("Adam", "waiter");
    employees.changeStatusOfEmployee("Adam");
    const foundEmployee = employees.listOfEmployees.find(
      (employee) => employee.name === "Adam"
    );
    expect(foundEmployee?.isFree).to.equal(false);
  })
  it("finding employee by the role", () => {
    const employees = Employee.getInstance();
    employees.addNewEmployee("Adam", "waiter");
    employees.addNewEmployee("Dawid", "chef");

    const foundEmployee = employees.findEmployeeByRole("chef");
    expect(foundEmployee?.name).to.equal("Dawid");
  })
});
