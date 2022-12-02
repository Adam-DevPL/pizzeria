export interface IEmployee {
  id: string;
  name: string;
  role: Role;
  isFree: boolean;
}

export enum Role {
  waiter,
  chef,
}
