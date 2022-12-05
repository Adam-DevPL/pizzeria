import { Employee } from "../Employees/Employees";
import { Role } from "../Employees/IEmployee";
import {
  IIngredient,
  IngredientsBase,
  ReceipeIngredient,
} from "../Ingredients/IIngredient";
import { Ingredients } from "../Ingredients/Ingredients";
import { IOrder } from "../Order/IOrder";
import { Orders } from "../Order/Orders";
import { IPizza } from "../Pizzas/IPizza";
import { Pizzas } from "../Pizzas/Pizzas";
import { Tables } from "../Table/Tables";
import { Vouchers } from "../Voucher/Vouchers";

export class Pizzeria {
  private static instance: Pizzeria;
  ingredients: Ingredients;
  private employees: Employee;
  private tables: Tables;
  private vouchers: Vouchers;
  private orders: Orders;
  private pizzas: Pizzas;

  private constructor() {
    this.ingredients = Ingredients.getInstance();
    this.employees = Employee.getInstance();
    this.tables = Tables.getInstance();
    this.vouchers = Vouchers.getInstance();
    this.orders = Orders.getInstance();
    this.pizzas = Pizzas.getInstance();
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

  public createPizza(name: string, ingredients: ReceipeIngredient[]) {
    this.pizzas.addPizzaReceipe(name, ingredients);
  }

  public makeNewOrder(
    id: number,
    seatsNo: number,
    pizzas: IPizza[],
    voucherName: string,
    margin: number
  ) {
    const assignWaiter = this.employees.findEmployeeByRole("waiter");

    if (!assignWaiter) {
      return "There is no waiter to take up the order";
    }

    const assignTable = this.tables.findFreeTable(seatsNo);

    if (!assignTable) {
      return "No free table. Can not take the order";
    }

    const canWeMakeAllPizza = pizzas
      .map((pizza) =>
        this.ingredients.checkQuantityOfIngredientsForPizza(pizza)
      )
      .every((e) => e === true);

    if (!canWeMakeAllPizza) {
      return "We have no enough ingredients to prepare the order";
    }

    const totalCostIngredients = pizzas
      .map((pizza) => pizza.ingredients)
      .reduce((total, ingredients) => {
        return total + this.ingredients.calculateIngredientsCosts(ingredients);
      }, 0);

    const assignChef = this.employees.findEmployeeByRole("chef");

    this.orders.addNewOrder(
      id,
      assignChef,
      assignWaiter,
      assignTable,
      pizzas,
      0
    );

    this.orders.calculateTheFinalPrice(
      id,
      this.vouchers.calcDiscount(voucherName),
      totalCostIngredients,
      margin
    );

    if (!assignChef) {
      this.orders.toQueue(id);
      return `There is no free chef.Your order will go into the queue. Final price: ${
        this.orders.findOrder(id)?.finalPrice
      }`;
    } else {
      this.employees.changeStatusOfEmployee(assignChef.name);
      return `Your order will be procceded. Final price: ${
        this.orders.findOrder(id)?.finalPrice
      }`;
    }
  }

  public assignChefIfFree(orderId: number) {
    const foundOrder = this.orders.findOrder(orderId);
    if (!foundOrder) {
      return `There is no order - ${orderId}`;
    }
    const assignChef = this.employees.findEmployeeByRole("chef");

    if (!assignChef) {
      return "There is still no free chef";
    }
    this.orders.toQueue(orderId);
    foundOrder.chefAssigned = assignChef;

    return "Your order will be realised now";
  }
}
