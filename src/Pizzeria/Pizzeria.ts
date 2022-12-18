import { Employee } from "../Employees/Employee";
import { Employees } from "../Employees/Employees";
import { EmployeeDto, Role } from "../Employees/IEmployee";
import { IngredientsBase, ReceipeIngredient } from "../Ingredients/IIngredient";
import { Ingredient } from "../Ingredients/Ingredient";
import { Ingredients } from "../Ingredients/Ingredients";
import { OrderDto, OrderStatus } from "../Order/IOrder";
import { Order } from "../Order/Order";
import { Orders } from "../Order/Orders";
import { PizzaType } from "../Pizzas/IPizza";
import { Pizza } from "../Pizzas/Pizza";
import { Pizzas } from "../Pizzas/Pizzas";
import { TableDto } from "../Table/ITable";
import { Table } from "../Table/Table";
import { Tables } from "../Table/Tables";
import { VoucherDto } from "../Voucher/IVoucher";
import { Voucher } from "../Voucher/Voucher";
import { Vouchers } from "../Voucher/Vouchers";
import { IPizzeria } from "./IPizzeria";

export class Pizzeria implements IPizzeria {
  private ingredients: Ingredients;
  private employees: Employees;
  private tables: Tables;
  private vouchers: Vouchers;
  private orders: Orders;
  private pizzas: Pizzas;
  private _margin: number = 10;

  constructor() {
    this.ingredients = Ingredients.getInstance();
    this.employees = Employees.getInstance();
    this.tables = Tables.getInstance();
    this.vouchers = Vouchers.getInstance();
    this.orders = Orders.getInstance();
    this.pizzas = Pizzas.getInstance();
  }

  public get margin(): number {
    return this._margin;
  }

  public set margin(value: number) {
    this._margin = value;
  }

  public hireNewEmployee(newEmployee: EmployeeDto): string {
    let returnMsg: string = "";
    try {
      const employee: Employee | null =
        this.employees.addNewEmployee(newEmployee);
      if (!employee) {
        returnMsg = "Employee exists in database";
      } else returnMsg = "Employee created successfully";
    } catch (error: any) {
      returnMsg = error.message;
    }

    return returnMsg;
  }

  public purchaseNewTable(newTable: TableDto): string {
    let returnMsg: string = "";
    try {
      const table: Table | null = this.tables.addNewTable(newTable);
      if (!table) {
        returnMsg = "Table exists in database";
      } else returnMsg = "Table purchesed successfully";
    } catch (error: any) {
      returnMsg = error.message;
    }

    return returnMsg;
  }

  public purchaseIngredients(
    ingredient: IngredientsBase,
    quantity: number,
    price: number
  ): string {
    let returnMsg: string = "";
    try {
      const newIngredient: Ingredient | null =
        this.ingredients.purchaseIngredients(ingredient, price, quantity);
      if (!newIngredient) {
        returnMsg = "Ingredient added to stock";
      } else returnMsg = "New ingredient added to the stock";
    } catch (error: any) {
      returnMsg = error.message;
    }

    return returnMsg;
  }

  public addNewVoucher(newVoucher: VoucherDto): string {
    let returnMsg: string = "";
    try {
      const voucher: Voucher | null = this.vouchers.addVoucher(newVoucher);
      if (!voucher) {
        returnMsg = "Vucher exists in database";
      } else returnMsg = "New voucher was added";
    } catch (error: any) {
      returnMsg = error.message;
    }

    return returnMsg;
  }

  public createPizza(
    name: PizzaType,
    ingredients: ReceipeIngredient[]
  ): string {
    let returnMsg: string = "";
    try {
      const pizzaReceipe: Pizza | null = this.pizzas.addPizzaReceipe(
        name,
        ingredients
      );
      if (!pizzaReceipe) {
        returnMsg = "This receipe exist already in database";
      } else returnMsg = "New receipe aded to menu";
    } catch (error: any) {
      returnMsg = error.message;
    }

    return returnMsg;
  }

  public makeNewOrder(
    seatsNo: number,
    pizzasOrdered: PizzaType[],
    voucherName: string
  ): string {
    try {
      const assignWaiter: Employee | null = this.employees.findEmployeeByRole(
        Role.waiter
      );

      if (!assignWaiter) {
        return "No free waiter";
      }

      const assignTable: Table | null = this.tables.findFreeTable(seatsNo);

      if (!assignTable) {
        return "No free table.";
      }

      const pizzasToPrepare: Map<string, Pizza> | null =
        this.pizzas.getAllPizzasFromOrder(pizzasOrdered);

      if (!pizzasToPrepare) {
        throw new Error("There is no pizza receipe in the menu!");
      }

      const doWeHaveAllIngredeintsForOrder: boolean[] = [];

      pizzasToPrepare.forEach((pizza) => {
        doWeHaveAllIngredeintsForOrder.push(
          this.ingredients.checkQuantityOfIngredientsForPizza(pizza)
        );
      });

      if (!doWeHaveAllIngredeintsForOrder.every((p) => p === true)) {
        return "Order can't be realized, because of not enaugh ingredients. Sorry.";
      }

      let ingredientsCost: number = 0;
      pizzasToPrepare.forEach((pizza) => {
        ingredientsCost += this.ingredients.calculateIngredientsCosts(
          pizza.ingredients
        );
      });

      const discount: number = this.vouchers.calcDiscount(voucherName);

      const assignChef = this.employees.findEmployeeByRole(Role.chef);

      const orderDto: OrderDto = {
        chefAssigned: assignChef,
        waiterAssigned: assignWaiter,
        tableAssigned: assignTable,
        pizzasOrdered: pizzasOrdered,
        status: assignChef ? OrderStatus.pending : OrderStatus.queue,
        discount: discount,
        ingredientsCosts: ingredientsCost,
        margin: this.margin,
      };
      const newOrder: Order = this.orders.addNewOrder(orderDto);
      if (!newOrder.chefAssigned) {
        return `Your order is in the queue. The final price is: ${newOrder.finalPrice}`;
      }
      return `Your order is undergoing. The final price is: ${newOrder.finalPrice}`;
    } catch (error: any) {
      return error.message;
    }
  }

  public assignChefIfFree(orderId: string): string {
    const foundOrder: Order | null = this.orders.getOrder(orderId);
    if (!foundOrder) {
      return "Order not found!";
    }

    const assignChef = this.employees.findEmployeeByRole(Role.chef);

    if (!assignChef) {
      return "No free chef for the order";
    }

    this.employees.changeStatusOfEmployee(assignChef.id);

    return "There is free chef. Your order will proceed";
  }
}
