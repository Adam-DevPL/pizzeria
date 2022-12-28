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

  public findEmployeeByRole(role: Role): Employee | null {
    const foundEmployee: Employee | undefined = [...this.getAllFreeEmployees()]
      .map((value) => value[1])
      .find((employee) => employee.role === role);

    return foundEmployee ?? null;
  }

  public addNewEmployee({ name, role }: EmployeeDto): Employee {
    Validator.validateStringNotEmpty(name);

    const foundEmployee: Employee | null = this.findEmployeeByName(name);

    if (foundEmployee) {
      throw new Error(`Employee ${name} already exists`);
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
    const employeeFree: Employee | undefined =
      this.getAllFreeEmployees().get(employeeId);

    if (employeeFree) {
      this.getAllFreeEmployees().delete(employeeFree.id);
      this.getAllOccupiedEmployees().set(employeeFree.id, employeeFree);
      return true;
    }

    const employeeOccupied: Employee | undefined =
      this.getAllOccupiedEmployees().get(employeeId);

    if (employeeOccupied) {
      this.getAllOccupiedEmployees().delete(employeeOccupied.id);
      this.getAllFreeEmployees().set(employeeOccupied.id, employeeOccupied);
      return true;
    }

    return false;
  }

  private findEmployeeByName(employeeName: string): Employee | null {
    const foundEmployee: Employee | undefined = [...this.getAllEmployees()]
      .map((value) => value[1])
      .find((employee) => employee.name === employeeName);

    return foundEmployee ?? null;
  }
}
