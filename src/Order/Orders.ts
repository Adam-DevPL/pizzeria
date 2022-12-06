import { v4 as uuid } from "uuid";

import { Employee } from "../Employees/Employee";
import { Pizza } from "../Pizzas/Pizza";
import { Table } from "../Table/Table";
import { OrderStatus } from "./IOrder";
import { Order } from "./Order";

export class Orders {
  private static instance: Orders;
  private listOfOrders: Map<string, Order> = new Map();

  private constructor() {}

  public static getInstance(): Orders {
    if (!Orders.instance) {
      Orders.instance = new Orders();
    }
    return Orders.instance;
  }

  public getOrder(orderId: string): Order | null {
    return this.listOfOrders.get(orderId) ?? null;
  }

  public getAllOrders(): Map<string, Order> {
    return this.listOfOrders;
  }

  public addNewOrder(
    orderStatus: OrderStatus,
    chefAssigned: Employee | null,
    waiterAssigned: Employee,
    tableAssigned: Table | null,
    pizzasOrdered: Pizza[],
    finalPrice: number
  ): Order {
    const newId: string = uuid();
    const newOrder: Order = new Order(
      newId,
      orderStatus,
      chefAssigned,
      waiterAssigned,
      tableAssigned,
      pizzasOrdered,
      finalPrice
    );
    this.listOfOrders.set(newId, newOrder);

    return newOrder;
  }

  public calculateTheFinalPrice(
    orderId: string,
    discount: number,
    ingredientsCosts: number,
    margin: number
  ): void {
    const foundOrder: Order | null = this.getOrder(orderId);
    if (foundOrder) {
      foundOrder.finalPrice =
        ingredientsCosts +
        margin -
        (discount / 100) * (ingredientsCosts + margin);
    }
  }
}
