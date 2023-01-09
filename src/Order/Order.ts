import { Employee } from "../Employees/Employee";
import { PizzaType } from "../Pizzas/Pizza.types";
import { Table } from "../Table/Table";
import { IOrder } from "./Order.types";

export class Order implements IOrder {
  readonly id: string;
  readonly chefAssigned: Employee | null;
  readonly waiterAssigned: Employee;
  readonly tableAssigned: Table;
  readonly pizzasOrdered: PizzaType[];
  readonly finalPrice: number;

  constructor(
    id: string,
    chefAssigned: Employee | null,
    waiterAssigned: Employee,
    tableAssigned: Table,
    pizzasOrdered: PizzaType[],
    finalPrice: number
  ) {
    this.id = id;
    this.chefAssigned = chefAssigned;
    this.waiterAssigned = waiterAssigned;
    this.tableAssigned = tableAssigned;
    this.pizzasOrdered = pizzasOrdered;
    this.finalPrice = finalPrice;
  }
}
