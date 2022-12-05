import { IEmployee } from "../Employees/IEmployee";
import { IPizza } from "../Pizzas/IPizza";
import { ITable } from "../Table/ITable";
import { IOrder, OrderStatus } from "./IOrder";

export class Order implements IOrder {
  private _id: string;
  private _orderStatus: OrderStatus;
  private _chefAssigned: IEmployee | null;
  private _waiterAssigned: IEmployee;
  private _tableAssigned: ITable | null;
  private _pizzasOrdered: IPizza[];
  private _finalPrice: number;

  constructor(
    id: string,
    orderStatus: OrderStatus,
    chefAssigned: IEmployee | null,
    waiterAssigned: IEmployee,
    tableAssigned: ITable | null,
    pizzasOrdered: IPizza[],
    finalPrice: number
  ) {
    this._id = id;
    this._orderStatus = orderStatus;
    this._chefAssigned = chefAssigned;
    this._waiterAssigned = waiterAssigned;
    this._tableAssigned = tableAssigned;
    this._pizzasOrdered = pizzasOrdered;
    this._finalPrice = finalPrice;
  }

  get id() {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get orderStatus() {
    return this._orderStatus;
  }
  set orderStatus(value: OrderStatus) {
    this._orderStatus = value;
  }
  get chefAssigned(): IEmployee | null {
    return this._chefAssigned;
  }
  set chefAssigned(value: IEmployee | null) {
    this._chefAssigned = value;
  }
  get waiterAssigned(): IEmployee {
    return this._waiterAssigned;
  }
  set waiterAssigned(value: IEmployee) {
    this._waiterAssigned = value;
  }
  get tableAssigned() {
    return this._tableAssigned;
  }
  set tableAssigned(value: ITable | null) {
    this._tableAssigned = value;
  }
  get pizzasOrdered() {
    return this._pizzasOrdered;
  }
  set pizzasOrdered(value: IPizza[]) {
    this._pizzasOrdered = [...value];
  }
  get finalPrice() {
    return this._finalPrice;
  }
  set finalPrice(value: number) {
    this._finalPrice = value;
  }
}
