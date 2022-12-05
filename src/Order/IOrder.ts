import { IEmployee } from "../Employees/IEmployee";
import { IPizza } from "../Pizzas/IPizza";
import { ITable } from "../Table/ITable";

export interface IOrder {
  id: string;
  orderStatus: OrderStatus;
  chefAssigned: IEmployee | null;
  waiterAssigned: IEmployee;
  tableAssigned: ITable | null;
  pizzasOrdered: IPizza[];
  finalPrice: number;
}

export enum OrderStatus {
  finished = "finished",
  queue = "queue",
  processing = "processing",
}