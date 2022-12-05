import { Employee } from "../Employees/Employees";
import { IEmployee } from "../Employees/IEmployee";
import { IPizza } from "../Pizzas/IPizza";
import { Pizzas } from "../Pizzas/Pizzas";
import { ITable } from "../Table/ITable";
import { Tables } from "../Table/Tables";
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
      chefAssigned,
      waiterAssigned,
      tableAssigned,
      pizzasOrdered,
      finalPrice,
    });
  }

  public toQueue(orderId: number) {
    this.listOfOrders.forEach((o) => {
      if (o.id === orderId) {
        o.inQueue = true;
      }
    });
  }

  public calculateTheFinalPrice(orderId: number, discount: number, ingredientsCosts: number, margin: number) {
    this.listOfOrders.forEach(order => {
      if (order.id === orderId) {
        order.finalPrice = ingredientsCosts + margin - (discount/100 * (ingredientsCosts + margin));
      }
    })
  }
}
