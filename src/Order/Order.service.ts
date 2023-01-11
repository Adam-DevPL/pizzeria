import { v4 as uuid } from "uuid";

import { Validator } from "../Validator/Validator";
import { OrderDto, OrderStatus } from "./Order.types";
import { Order } from "./Order";
import { Injectable } from "../Injector/Injector.service";

@Injectable()
export class Orders {
  private listOfOrderInProgress: Map<string, Order> = new Map();
  private listOfOrderInQueue: Map<string, Order> = new Map();

  public getOrder = (orderId: string): Order | null =>
    this.getAllOrders().get(orderId) ?? null;

  public getAllOrdersInProgress = (): Map<string, Order> =>
    this.listOfOrderInProgress;

  public getAllOrdersInQueue = (): Map<string, Order> =>
    this.listOfOrderInQueue;

  public getAllOrders = (): Map<string, Order> =>
    new Map<string, Order>([
      ...this.listOfOrderInProgress,
      ...this.listOfOrderInQueue,
    ]);

  public addNewOrder = ({
    chefAssigned,
    waiterAssigned,
    tableAssigned,
    pizzasOrdered,
    status,
    discount,
    ingredientsCosts,
    margin,
  }: OrderDto): Order => {
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
    if (status === OrderStatus.Pending) {
      this.listOfOrderInProgress.set(newId, newOrder);
    } else {
      this.listOfOrderInQueue.set(newId, newOrder);
    }

    return newOrder;
  };

  private calculateTheFinalPrice = (
    discount: number,
    ingredientsCosts: number,
    margin: number
  ): number =>
    ingredientsCosts + margin - (discount / 100) * (ingredientsCosts + margin);
}
