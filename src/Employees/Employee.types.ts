export interface IEmployee {
  readonly id: string;
  readonly name: string;
  readonly role: Role;
}

export enum Role {
  Waiter,
  Chef,
}

export interface EmployeeDto {
  name: string;
  role: Role;
}
