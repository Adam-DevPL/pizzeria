import { Employee } from "../Employee/Employee";
import { IEmployee } from "../Employee/IEmployee";
import { IPizza } from "../Pizza/IPizza";
import { Pizzas } from "../Pizza/Pizza";
import { ITable } from "../Table/ITable";
import { Table } from "../Table/Table";
import { IOrder, SpecialVouchers } from "./IOrder";

export class Orders {
  private static instance: Orders;
  listOfOrders: IOrder[] = [];

  private constructor() {}

  public static getInstance(): Orders {
    if (!Orders.instance) {
      Orders.instance = new Orders();
    }
    return Orders.instance;
  }

  public findOrder(orderId: number) {
    return this.listOfOrders.find((o) => o.id === orderId) ?? null;
  }

  public addNewOrder(
    id: number,
    chefAssigned: IEmployee | null,
    waiterAssigned: IEmployee,
    tableAssigned: ITable | null,
    pizzasOrdered: IPizza[],
    finalPrice: number
  ) {
    this.listOfOrders.push({
      id,
      isFinished: false,
      chefAssigned,
      waiterAssigned,
      tableAssigned,
      pizzasOrdered,
      finalPrice,
    });
  }
}
