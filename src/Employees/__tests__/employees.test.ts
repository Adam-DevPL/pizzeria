import "mocha";
import { expect } from "chai";
import { Employees } from "../Employees";
import { Role } from "../IEmployee";

describe("Employees", () => {
  describe("adding new employee", () => {
    beforeEach(() => {
      const employees = Employees.getInstance();
      employees.getAllEmployees().clear();
    });
    it("Truthy", () => {
      const employees = Employees.getInstance();
      const foundEmployee = employees.addNewEmployee("Adam", Role.chef);

      expect(foundEmployee?.name).to.equal("Adam");
    });
    it("Falsy - name is empty", () => {
      const employees = Employees.getInstance();

      expect(function () {
        employees.addNewEmployee("", Role.chef);
      }).to.throw(Error);
    });
    it("Falsy - employee duplicated", () => {
      const employees = Employees.getInstance();
      employees.addNewEmployee("Adam", Role.chef);
      const duplicatedEmployee = employees.addNewEmployee("Adam", Role.chef);

      expect(duplicatedEmployee).to.null;
    });
  });

  describe("deleting employee", () => {
    beforeEach(() => {
      const employees = Employees.getInstance();
      employees.getAllEmployees().clear();
    });
    it("Truthy - employee deleted", () => {
      const employees = Employees.getInstance();
      const employee = employees.addNewEmployee("Adam", Role.chef);
      const ifDeletedEmployee = employee
        ? employees.removeEmployee(employee.id)
        : false;

      expect(ifDeletedEmployee).to.true;
    });
    it("Falsy - employee wasn't found", () => {
      const employees = Employees.getInstance();
      const ifDeletedEmployee: boolean = employees.removeEmployee("");

      expect(ifDeletedEmployee).to.false;
    });
  });
  describe("changing status of the employee", () => {
    beforeEach(() => {
      const employees = Employees.getInstance();
      employees.getAllEmployees().clear();
    });
    it("Truthy - change status of the employee from true to false (not free)", () => {
      const employees = Employees.getInstance();
      const employee = employees.addNewEmployee("Adam", Role.waiter);
      const isSuccess = employee
        ? employees.changeStatusOfEmployee(employee.id)
        : false;

      expect(isSuccess).to.true;
    });
    it("Falsy - employee wasn't found", () => {
      const employees = Employees.getInstance();
      const isSuccess = employees.changeStatusOfEmployee("");

      expect(isSuccess).to.false;
    });
  });
  describe("finding employee by the role", () => {
    beforeEach(() => {
      const employees = Employees.getInstance();
      employees.getAllEmployees().clear();
    });
    it("Truthy - finding employee who is the chef", () => {
      const employees = Employees.getInstance();
      employees.addNewEmployee("Adam", Role.waiter);
      employees.addNewEmployee("Dawid", Role.chef);

      const foundEmployee = employees.findEmployeeByRole(Role.chef);
      expect(foundEmployee ? foundEmployee.name : null).to.equal("Dawid");
    });
    it("Falsy - employee wasn't found", () => {
      const employees = Employees.getInstance();

      const foundEmployee = employees.findEmployeeByRole(Role.chef);
      expect(foundEmployee).to.null;
    });
  });
});
