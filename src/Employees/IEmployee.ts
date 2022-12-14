export interface IEmployee {
  readonly id: string;
  readonly name: string;
  readonly role: Role;
}

export enum Role {
  waiter = "waiter",
  chef = "chef",
}

export interface EmployeeDto {
  name: string;
  role: Role;
}
