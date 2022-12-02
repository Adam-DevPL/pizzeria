import { Validator } from "../Validator/Validator";
import { IEmployee, Role } from "./IEmployee";
import { v4 as uuid } from "uuid";
import { Employee } from "./Employee";

export class Employees {
  private static instance: Employees;
  private listOfEmployees: Map<string, Employee> = new Map();

  private constructor() {}

  public static getInstance(): Employees {
    if (!Employees.instance) {
      Employees.instance = new Employees();
    }
    return Employees.instance;
  }

  findEmployeeById(employeeId: string): Employee | null {
    return this.listOfEmployees.get(employeeId) ?? null;
  }

  private findEmployeeByName(employeeName: string): Employee | null {
    let foundEmployee: IEmployee | null = null;
    this.listOfEmployees.forEach((employee) => {
      if (employee.name === employeeName) {
        foundEmployee = employee;
        return;
      }
    });
    return foundEmployee;
  }

  findEmployeeByRole(role: Role): Employee | null {
    let foundEmployee: IEmployee | null = null;
    this.listOfEmployees.forEach((employee) => {
      if (employee.role === role) {
        foundEmployee = employee;
        return;
      }
    });
    return foundEmployee;
  }

  addNewEmployee(name: string, role: Role): Employee | null {
    Validator.validateStringNotEmpty(name);

    const foundEmployee: IEmployee | null = this.findEmployeeByName(name);

    if (foundEmployee) {
      return null;
    }
    const newId: string = uuid();
    const newEmployee: Employee = new Employee(newId, name, role);
    this.listOfEmployees.set(newId, newEmployee);

    return newEmployee;
  }

  removeEmployee(employeeId: string): boolean {
    return this.listOfEmployees.delete(employeeId);
  }

  changeStatusOfEmployee(employeeId: string): boolean {
    const employee: Employee | null = this.findEmployeeById(employeeId);
    if (!employee) {
      return false;
    }
    employee.isFree = !employee.isFree;
    return true;
  }

  getAllEmployees(): Map<string, Employee> {
    return this.listOfEmployees;
  }
}
