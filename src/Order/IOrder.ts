import { IEmployee } from "../Employee/IEmployee";
import { IPizza } from "../Pizza/IPizza";
import { ITable } from "../Table/ITable";

export interface IOrder {
  id: number;
  isFinished: boolean;
  chefAssigned?: IEmployee | null;
  waiterAssigned: IEmployee;
  tableAssigned?: ITable | null;
  pizzasOrdered: IPizza[];
  finalPrice?: number;
}

export type SpecialVouchers = "10yo" | "student";
