import { Employee } from "../Employees/Employee";
import { PizzaType } from "../Pizzas/IPizza";
import { Table } from "../Table/Table";

export interface IOrder {
  readonly id: string;
  readonly chefAssigned: Employee | null;
  readonly waiterAssigned: Employee;
  readonly tableAssigned: Table;
  readonly pizzasOrdered: PizzaType[];
  readonly finalPrice: number;
}

export interface OrderDto {
  chefAssigned: Employee | null;
  waiterAssigned: Employee;
  tableAssigned: Table;
  pizzasOrdered: PizzaType[];
  status: OrderStatus;
  discount: number;
  ingredientsCosts: number;
  margin: number;
}

export enum OrderStatus {
  Queue,
  Pending,
}
