import { Employee } from "../Employee/Employee";
import { Role } from "../Employee/IEmployee";
import { Ingredients } from "../Ingredient/Ingredients";
import { IOrder } from "../Order/IOrder";
import { Order } from "../Order/Order";
import { IPizza } from "../Pizza/IPizza";
import { Table } from "../Table/Table";

export class Pizzeria {
  private static instance: Pizzeria;
  private ingredients: Ingredients;
  private employees: Employee;
  private tables: Table;
  private ordersOpened: IOrder[];
  private ordersFinished: IOrder[];

  private constructor() {
    this.ingredients = Ingredients.getInstance();
    this.employees = Employee.getInstance();
    this.tables = Table.getInstance();
    this.ordersOpened = [];
    this.ordersFinished = [];
  }

  public static getInstance(): Pizzeria {
    if (!Pizzeria.instance) {
      Pizzeria.instance = new Pizzeria();
    }
    return Pizzeria.instance;
  }

  public hireNewEmployee(name: string, role: Role) {
    this.employees.addNewEmployee(name, role);
  }

  public purchaseNewTable(tableNo: number, seatsNo: number) {
    this.tables.addNewTable(tableNo, seatsNo);
  }

  public purchaseIngredients(
    name: string,
    quantity: number,
    pricePerItem: number
  ) {
    this.ingredients.addNewIngredient(name, pricePerItem, quantity);
  }

  public makeNewOrder(id: number, seatsNo: number, pizzas: IPizza[]) {
    const assignWaiter = this.employees.findEmployee("waiter");

    if (!assignWaiter) {
      return "There is no waiter to take up the order";
    }

    const newOrder = new Order(id, assignWaiter);

    const assignTable = this.tables.findFreeTable(seatsNo);

    if (!assignTable) {
      return "No free table. Can not take the order";
    }

    this.tables.changeStatusOfTable(assignTable.tableNumber);
    newOrder.addTable(assignTable);

    const assignChef = this.employees.findEmployee("chef");

    if (!assignChef) {
      console.log("There is no free chef.Your order will go into the queue");
    } else {
      this.employees.changeStatusOfEmployee(assignChef.name);
      newOrder.addChef(assignChef);
      this.ordersOpened.push(newOrder);
    }

    newOrder.addPizzas(pizzas);
    console.log("Final price for order is: " + newOrder.getTotalPrice); 
  }
}
