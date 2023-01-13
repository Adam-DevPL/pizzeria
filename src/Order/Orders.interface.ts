import { Order } from "./Order";
import { OrderDto } from "./Order.types";

export interface IOrders {
  getOrder: (orderId: string) => Order | null;
  getAllOrdersInProgress: () => Map<string, Order>;
  getAllOrdersInQueue: () => Map<string, Order>;
  getAllOrders: () => Map<string, Order>;
  addNewOrder: (orderDto: OrderDto) => Order;
}
