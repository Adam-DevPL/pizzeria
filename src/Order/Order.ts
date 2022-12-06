import { Employee } from "../Employees/Employee";
import { IEmployee } from "../Employees/IEmployee";
import { IPizza } from "../Pizzas/IPizza";
import { Pizza } from "../Pizzas/Pizza";
import { ITable } from "../Table/ITable";
import { Table } from "../Table/Table";
import { IOrder, OrderStatus } from "./IOrder";

export class Order implements IOrder {
  private _id: string;
  private _orderStatus: OrderStatus;
  private _chefAssigned: Employee | null;
  private _waiterAssigned: Employee;
  private _tableAssigned: Table | null;
  private _pizzasOrdered: Pizza[];
  private _finalPrice: number;

  constructor(
    id: string,
    orderStatus: OrderStatus,
    chefAssigned: Employee | null,
    waiterAssigned: Employee,
    tableAssigned: Table | null,
    pizzasOrdered: Pizza[],
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
  get chefAssigned(): Employee | null {
    return this._chefAssigned;
  }
  set chefAssigned(value: Employee | null) {
    this._chefAssigned = value;
  }
  get waiterAssigned(): Employee {
    return this._waiterAssigned;
  }
  set waiterAssigned(value: Employee) {
    this._waiterAssigned = value;
  }
  get tableAssigned() {
    return this._tableAssigned;
  }
  set tableAssigned(value: Table | null) {
    this._tableAssigned = value;
  }
  get pizzasOrdered() {
    return this._pizzasOrdered;
  }
  set pizzasOrdered(value: Pizza[]) {
    this._pizzasOrdered = [...value];
  }
  get finalPrice() {
    return this._finalPrice;
  }
  set finalPrice(value: number) {
    this._finalPrice = value;
  }
}
