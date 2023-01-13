import "mocha";
import { expect } from "chai";
import { Employees } from "../Employee.service";
import { EmployeeDto, Role } from "../Employee.types";
import { Employee } from "../Employee";

describe("Employees", () => {
  describe("adding new employee", () => {
    it("Truthy", () => {
      //given
      const employees = new Employees();
      const employeeDto: EmployeeDto = { name: "Adam", role: Role.Chef };

      //when
      const foundEmployee = employees.addNewEmployee(employeeDto);      

      //then
      expect(foundEmployee?.name).to.equal("Adam");
    });

    it("Falsy - name is empty", () => {
      //given
      const employees = new Employees;
      const employeeDto: EmployeeDto = { name: "", role: Role.Chef };

      //then
      expect(function () {
        employees.addNewEmployee(employeeDto);
      }).to.throw(Error);
    });

    it("Falsy - employee duplicated", () => {
      //given
      const employees = new Employees();
      const employeeDto: EmployeeDto = { name: "Adam", role: Role.Chef };

      //when
      employees.addNewEmployee(employeeDto);

      //then
      expect(function() {employees.addNewEmployee(employeeDto);}).to.throw(Error);
    });
  });

  describe("deleting employee", () => {
    it("Truthy - employee deleted", () => {
      //given
      const employees = new Employees();
      const employeeDto: EmployeeDto = { name: "Adam", role: Role.Chef };

      //when
      const employee: Employee | null = employees.addNewEmployee(employeeDto);

      const ifDeletedEmployee = employee
        ? employees.removeEmployee(employee.id)
        : false;

      //then
      expect(ifDeletedEmployee).to.true;
    });

    it("Falsy - employee wasn't found", () => {
      //given
      const employees = new Employees();

      //when
      const ifDeletedEmployee: boolean = employees.removeEmployee("");

      //then
      expect(ifDeletedEmployee).to.false;
    });
  });

  describe("changing status of the employee", () => {
    it("Truthy - change status of the employee from free to occupied", () => {
      //given
      const employees = new Employees();
      const employeeDto: EmployeeDto = { name: "Adam", role: Role.Chef };

      //when
      const employee = employees.addNewEmployee(employeeDto);
      const isSuccess = employee
        ? employees.changeStatusOfEmployee(employee.id)
        : false;
      const findEmployeeInOccupiedList: Employee | undefined = employees.getAllOccupiedEmployees().get(employee.id);

      //then
      expect(isSuccess).to.true;
      expect(findEmployeeInOccupiedList).to.not.undefined;
    });

    it("Falsy - employee wasn't found", () => {
      //given
      const employees = new Employees();

      //when
      const isSuccess = employees.changeStatusOfEmployee("");

      //then
      expect(isSuccess).to.false;
    });
  });

  describe("finding employee by the role", () => {
    it("Truthy - finding employee who is the chef", () => {
      //given
      const employees = new Employees();
      const chefDto: EmployeeDto = { name: "Dawid", role: Role.Chef };
      const waiterDto: EmployeeDto = { name: "Adam", role: Role.Waiter };

      //when
      employees.addNewEmployee(chefDto);
      employees.addNewEmployee(waiterDto);
      const foundEmployee = employees.findEmployeeByRole(Role.Chef);      

      //then
      expect(foundEmployee ? foundEmployee.name : null).to.equal("Dawid");
    });

    it("Falsy - employee wasn't found", () => {
      //given
      const employees = new Employees();

      //when
      const foundEmployee = employees.findEmployeeByRole(Role.Chef);

      //then
      expect(foundEmployee).to.null;
    });
  });
});
