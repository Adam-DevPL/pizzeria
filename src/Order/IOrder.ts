import { Employee } from "../Employees/Employee";
import { Pizza } from "../Pizzas/Pizza";
import { Table } from "../Table/Table";

export interface IOrder {
  id: string;
  orderStatus: OrderStatus;
  chefAssigned: Employee | null;
  waiterAssigned: Employee;
  tableAssigned: Table | null;
  pizzasOrdered: Pizza[];
  finalPrice: number;
}

export enum OrderStatus {
  finished = "finished",
  queue = "queue",
  processing = "processing",
}