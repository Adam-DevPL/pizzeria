import { v4 as uuid } from "uuid";

import { Validator } from "../Validator/Validator";
import { OrderDto, OrderStatus } from "./IOrder";
import { Order } from "./Order";

export class Orders {
  private static instance: Orders;
  private listOfOrderInProgress: Map<string, Order> = new Map();
  private listOfOrderInQueue: Map<string, Order> = new Map();

  private constructor() {}

  public static getInstance(): Orders {
    if (!Orders.instance) {
      Orders.instance = new Orders();
    }
    return Orders.instance;
  }

  public getOrder(orderId: string): Order | null {
    return this.getAllOrders().get(orderId) ?? null;
  }

  public getAllOrdersInProgress(): Map<string, Order> {
    return this.listOfOrderInProgress;
  }

  public getAllOrdersInQueue(): Map<string, Order> {
    return this.listOfOrderInQueue;
  }

  public getAllOrders(): Map<string, Order> {
    return new Map<string, Order>([
      ...this.listOfOrderInProgress,
      ...this.listOfOrderInQueue,
    ]);
  }

  public addNewOrder({
    chefAssigned,
    waiterAssigned,
    tableAssigned,
    pizzasOrdered,
    status,
    discount,
    ingredientsCosts,
    margin,
  }: OrderDto): Order {
    Validator.validatePizzasNoInOrder(pizzasOrdered.length);
    Validator.validateDiscount(discount);
    Validator.validateNumberMoreOrEqualZero(ingredientsCosts);
    Validator.validateNumberMoreOrEqualZero(margin);

    const newId: string = uuid();
    const finalPrice: number = this.calculateTheFinalPrice(
      discount,
      ingredientsCosts,
      margin
    );
    const newOrder: Order = new Order(
      newId,
      chefAssigned,
      waiterAssigned,
      tableAssigned,
      pizzasOrdered,
      finalPrice
    );
    if (status === OrderStatus.pending) {
      this.listOfOrderInProgress.set(newId, newOrder);
    } else {
      this.listOfOrderInQueue.set(newId, newOrder);
    }

    return newOrder;
  }

  private calculateTheFinalPrice(
    discount: number,
    ingredientsCosts: number,
    margin: number
  ): number {
    return (
      ingredientsCosts + margin - (discount / 100) * (ingredientsCosts + margin)
    );
  }
}
