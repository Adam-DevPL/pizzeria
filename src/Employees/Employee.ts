import { IEmployee, Role } from "./Employee.types";

export class Employee implements IEmployee {
  readonly id: string;
  readonly name: string;
  readonly role: Role;

  constructor(id: string, name: string, role: Role) {
    this.id = id;
    this.name = name;
    this.role = role;
  }
}
