import { Validator } from "../Validator/Validator";
import { IEmployee, Role } from "./IEmployee";

export class Employee {
  private static instance: Employee;
  public listOfEmployees: IEmployee[] = [];

  private constructor() {}

  public static getInstance(): Employee {
    if (!Employee.instance) {
      Employee.instance = new Employee();
    }
    return Employee.instance;
  }

  private findEmployeeByName(name: string) {
    return this.listOfEmployees.find((employee) => employee.name === name) ?? null;
  }

  findEmployeeByRole(role: Role) {
    return this.listOfEmployees.find(
      (employee) => employee.role === role && employee.isFree === true
    ) ?? null
  }

  addNewEmployee(name: string, role: Role) {
    if (!Validator.validateStringNotEmpty(name)) {
      return "Employee can't be added - no name passed.";
    }
    const foundEmployee = this.findEmployeeByName(name);

    if (foundEmployee) {
      return "Duplicated employee";
    }
    this.listOfEmployees.push({ name: name, role: role, isFree: true });

    return "Employee added to the list";
  }

  removeEmployee(name: string) {
    if (!this.findEmployeeByName(name)) {
      return "Employee wasn't found";
    }
    this.listOfEmployees = this.listOfEmployees.filter(
      (employee) => employee.name !== name
    );
    return "Employee sussesfully removed";
  }

  changeStatusOfEmployee(name: string) {
    if (!this.findEmployeeByName(name)) {
      return "Employee wasn't found";
    }
    this.listOfEmployees.forEach((employee) => {
      if (employee.name === name) {
        employee.isFree = !employee.isFree;
      }
    });
    return "Employee's status was changed";
  }
}
