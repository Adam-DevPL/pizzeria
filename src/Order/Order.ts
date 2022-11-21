import { Employee } from "../Employee/Employee";
import { IEmployee } from "../Employee/IEmployee";
import { IPizza } from "../Pizza/IPizza";
import { Pizza } from "../Pizza/Pizza";
import { ITable } from "../Table/ITable";
import { Table } from "../Table/Table";
import { IOrder, SpecialVouchers } from "./IOrder";

export class Order implements IOrder {
  id: number;
  isFinished = false;
  // vouchers: string[];
  // specialVouchers: SpecialVouchers;
  chefAssigned: IEmployee | null = null;
  waiterAssigned: IEmployee;
  tableAssigned: ITable | null = null;
  pizzasOrdered: IPizza[] = [];
  finalPrice: number = 0;

  constructor(id: number, waiter: IEmployee) {
    this.id = id;
    this.waiterAssigned = waiter;
  }

  addChef(chef: IEmployee) {
    this.chefAssigned = chef;
  }

  addTable(table: ITable) {
    this.tableAssigned = table;
  }

  addPizzas(pizzas: IPizza[]) {
    this.pizzasOrdered.push(...pizzas);
    this.finalPrice = this.pizzasOrdered.reduce((total, pizza) => total + pizza.price, 0);
  }

  getTotalPrice() {
    return this.finalPrice;
  }
}
