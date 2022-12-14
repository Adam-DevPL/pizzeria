import { IEmployee, Role } from "./IEmployee";

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
