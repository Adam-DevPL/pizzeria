import { Validator } from "../Validator/Validator";
import { EmployeeDto, IEmployee, Role } from "./IEmployee";
import { v4 as uuid } from "uuid";
import { Employee } from "./Employee";

export class Employees {
  private static instance: Employees;
  private listOfFreeEmployees: Map<string, Employee> = new Map();
  private listOfOccupiedEmployees: Map<string, Employee> = new Map();

  private constructor() {}

  public static getInstance(): Employees {
    if (!Employees.instance) {
      Employees.instance = new Employees();
    }
    return Employees.instance;
  }

  public findEmployeeById(employeeId: string): Employee | null {
    return this.getAllEmployees().get(employeeId) ?? null;
  }

  private findEmployeeByName(employeeName: string): Employee | null {
    let foundEmployee: Employee | null = null;
    this.getAllEmployees().forEach((employee) => {
      if (employee.name === employeeName) {
        foundEmployee = employee;
        return;
      }
    });
    return foundEmployee;
  }

  public findEmployeeByRole(role: Role): Employee | null {
    let foundEmployee: Employee | null = null;
    this.getAllFreeEmployees().forEach((employee) => {
      if (employee.role === role) {
        foundEmployee = employee;
        return;
      }
    });
    return foundEmployee;
  }

  public addNewEmployee({ name, role }: EmployeeDto): Employee | null {
    Validator.validateStringNotEmpty(name);

    const foundEmployee: Employee | null = this.findEmployeeByName(name);

    if (foundEmployee) {
      return null;
    }

    const newId: string = uuid();
    const newEmployee: Employee = new Employee(newId, name, role);    

    this.listOfFreeEmployees.set(newId, newEmployee);

    return newEmployee;
  }

  public removeEmployee(employeeId: string): boolean {
    return this.listOfFreeEmployees.delete(employeeId);
  }

  public changeStatusOfEmployee(employeeId: string): boolean {
    const employeeFree: Employee | undefined = this.getAllFreeEmployees().get(employeeId)

    if (employeeFree) {
      this.getAllFreeEmployees().delete(employeeFree.id);
      this.getAllOccupiedEmployees().set(employeeFree.id, employeeFree);
      return true;
    }

    const employeeOccupied: Employee | undefined = this.getAllOccupiedEmployees().get(employeeId);

    if (employeeOccupied) {
      this.getAllOccupiedEmployees().delete(employeeOccupied.id);
      this.getAllFreeEmployees().set(employeeOccupied.id, employeeOccupied);
      return true;
    }

    return false;
  }

  public getAllEmployees(): Map<string, Employee> {
    return new Map([
      ...this.listOfFreeEmployees,
      ...this.listOfOccupiedEmployees,
    ]);
  }

  public getAllFreeEmployees(): Map<string, Employee> {
    return this.listOfFreeEmployees;
  }

  public getAllOccupiedEmployees(): Map<string, Employee> {
    return this.listOfOccupiedEmployees;
  }
}
