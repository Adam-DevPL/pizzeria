import { IEmployee } from "../Employees/IEmployee";
import { IPizza } from "../Pizza/IPizza";
import { ITable } from "../Table/ITable";

export interface IOrder {
  id: number;
  inQueue?: boolean;
  chefAssigned?: IEmployee | null;
  waiterAssigned: IEmployee;
  tableAssigned?: ITable | null;
  pizzasOrdered: IPizza[];
  finalPrice?: number;
}

export type SpecialVouchers = "10yo" | "student";
