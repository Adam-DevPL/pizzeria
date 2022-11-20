export interface IEmployee {
  name: string;
  role: Role;
  isFree: boolean;
}

export type Role = "chef" | "waiter";
