import { Employee } from "../Employee/Employee";
import { Role } from "../Employee/IEmployee";
import {
  IIngredient,
  IngredientsBase,
  ReceipeIngredient,
} from "../Ingredient/IIngredient";
import { Ingredients } from "../Ingredient/Ingredients";
import { IOrder } from "../Order/IOrder";
import { Order } from "../Order/Order";
import { IPizza } from "../Pizza/IPizza";
import { Pizza } from "../Pizza/Pizza";
import { Table } from "../Table/Table";
import { Vouchers } from "../Voucher/Vouchers";

export class Pizzeria {
  private static instance: Pizzeria;
  ingredients: Ingredients;
  private employees: Employee;
  private tables: Table;
  private vouchers: Vouchers;
  private ordersInProgress: IOrder[];
  private ordersInLine: IOrder[];
  pizzas: IPizza[];

  private constructor() {
    this.ingredients = Ingredients.getInstance();
    this.employees = Employee.getInstance();
    this.tables = Table.getInstance();
    this.vouchers = Vouchers.getInstance();
    this.ordersInProgress = [];
    this.ordersInLine = [];
    this.pizzas = [];
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
    ingredient: IngredientsBase,
    quantity: number,
    price: number
  ) {
    this.ingredients.purchaseIngredients(ingredient, price, quantity);
  }

  public addNewVoucher(name: string, discount: number) {
    this.vouchers.addVoucher(name, discount);
  }

  public createPizza(
    name: string,
    ingredients: ReceipeIngredient[],
    margin: number = 0
  ) {
    const newPizza = new Pizza(name, ingredients);
    newPizza.addMargins(
      this.ingredients.calculateIngredientsCosts(ingredients) + margin
    );
    this.pizzas.push(newPizza);
  }

  public makeNewOrder(
    id: number,
    seatsNo: number,
    pizzas: IPizza[],
    voucherName: string
  ) {
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
      this.ordersInLine.push(newOrder);
    } else {
      this.employees.changeStatusOfEmployee(assignChef.name);
      newOrder.addChef(assignChef);
      this.ordersInProgress.push(newOrder);
    }

    newOrder.addPizzas(pizzas);
    console.log(
      "Final price for order is: " +
        (newOrder.getTotalPrice() -
          (newOrder.getTotalPrice() *
            this.vouchers.calcDiscount(voucherName) / 100))
    );
  }
}
