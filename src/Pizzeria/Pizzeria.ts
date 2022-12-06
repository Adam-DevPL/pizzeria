import { Employee } from "../Employees/Employee";
import { Employees } from "../Employees/Employees";
import { Role } from "../Employees/IEmployee";
import {
  IIngredient,
  IngredientsBase,
  ReceipeIngredient,
} from "../Ingredients/IIngredient";
import { Ingredients } from "../Ingredients/Ingredients";
import { IOrder, OrderStatus } from "../Order/IOrder";
import { Order } from "../Order/Order";
import { Orders } from "../Order/Orders";
import { IPizza, PizzaType } from "../Pizzas/IPizza";
import { Pizza } from "../Pizzas/Pizza";
import { Pizzas } from "../Pizzas/Pizzas";
import { Table } from "../Table/Table";
import { Tables } from "../Table/Tables";
import { Vouchers } from "../Voucher/Vouchers";

export class Pizzeria {
  private ingredients: Ingredients;
  private employees: Employees;
  private tables: Tables;
  private vouchers: Vouchers;
  private orders: Orders;
  private pizzas: Pizzas;

  constructor() {
    this.ingredients = Ingredients.getInstance();
    this.employees = Employees.getInstance();
    this.tables = Tables.getInstance();
    this.vouchers = Vouchers.getInstance();
    this.orders = Orders.getInstance();
    this.pizzas = Pizzas.getInstance();
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

  public createPizza(name: PizzaType, ingredients: ReceipeIngredient[]) {
    this.pizzas.addPizzaReceipe(name, ingredients);
  }

  public makeNewOrder(
    seatsNo: number,
    pizzasOrdered: PizzaType[],
    voucherName: string,
    margin: number
  ): null | Order {
    const assignWaiter: Employee | null = this.employees.findEmployeeByRole(
      Role.waiter
    );

    if (!assignWaiter) {
      return null;
    }

    const assignTable: Table | null = this.tables.findFreeTable(seatsNo);

    if (!assignTable) {
      return null;
    }

    const pizzasToPrepare: Map<string, Pizza> =
      this.pizzas.getAllPizzasFromOrder(pizzasOrdered);

    const doWeHaveAllIngredeintsForOrder: boolean[] = [];

    pizzasToPrepare.forEach((pizza) => {
      doWeHaveAllIngredeintsForOrder.push(
        this.ingredients.checkQuantityOfIngredientsForPizza(pizza)
      );
    });

    if (!doWeHaveAllIngredeintsForOrder.every((p) => p === true)) {
      return null;
    }

    let ingredientsCost: number = 0;
    pizzasToPrepare.forEach((pizza) => {
      ingredientsCost += this.ingredients.calculateIngredientsCosts(
        pizza.ingredients
      );
    });

    const assignChef = this.employees.findEmployeeByRole(Role.chef);

    const newOrder: Order = this.orders.addNewOrder(
      OrderStatus.processing,
      assignChef,
      assignWaiter,
      assignTable,
      pizzasOrdered
    );

    this.orders.calculateTheFinalPrice(
      newOrder.id,
      this.vouchers.calcDiscount(voucherName),
      ingredientsCost,
      margin
    );

    if (!assignChef) {
      this.orders.getOrder(newOrder.id)?.orderStatus === OrderStatus.queue;
      this.tables.changeStatusOfTable(assignTable.id);
      return newOrder;
    } else {
      this.employees.changeStatusOfEmployee(assignChef.id);
      this.tables.changeStatusOfTable(assignTable.id);
      return newOrder;
    }
  }

  public assignChefIfFree(orderId: string): boolean {
    const foundOrder: Order | null = this.orders.getOrder(orderId);
    if (!foundOrder) {
      return false;
    }
    const assignChef = this.employees.findEmployeeByRole(Role.chef);

    if (!assignChef) {
      return false;
    }
    foundOrder.orderStatus = OrderStatus.processing;
    foundOrder.chefAssigned = assignChef;

    return true;
  }
}
