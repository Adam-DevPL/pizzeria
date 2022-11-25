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

  addNewEmployee(name: string, role: Role) {
    const foundEmployee = this.listOfEmployees.find(
      (employee) => employee.name === name
    );
    if (foundEmployee) {
      return "Duplicated employee";
    }
    this.listOfEmployees.push({ name: name, role: role, isFree: true });

    return "Employee added to the list";
  }

  removeEmployee(name: string) {
    this.listOfEmployees = this.listOfEmployees.filter(
      (employee) => employee.name !== name
    );
  }

  changeStatusOfEmployee(name: string) {
    this.listOfEmployees.forEach((employee) => {
      if (employee.name === name) {
        employee.isFree = !employee.isFree;
      }
    });
  }

  findEmployee(role: Role) {
    return this.listOfEmployees.find(employee => employee.role === role && employee.isFree === true);
  }
}
