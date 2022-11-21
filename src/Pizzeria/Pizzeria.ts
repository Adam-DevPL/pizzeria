import { Employee } from "../Employee/Employee";
import { Role } from "../Employee/IEmployee";
import { Ingredients } from "../Ingredient/Ingredients";
import { IOrder } from "../Order/IOrder";
import { Order } from "../Order/Order";
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

  public purchaseIngredients(name: string, quantity: number, pricePerItem: number) {
    this.ingredients.addNewIngredient(name, pricePerItem, quantity);
  }

  public makeNewOrder(id: number) {
    const assignWaiter = this.employees.listOfEmployees.find(
      (employee) => employee.isFree === true && employee.role === "waiter"
    );

    if (!assignWaiter) {
      return "There is no waiter to take up the order"
    } 

    const newOrder = new Order(id, assignWaiter);
  }
}
