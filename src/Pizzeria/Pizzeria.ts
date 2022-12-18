import { Employee } from "../Employees/Employee";
import { Employees } from "../Employees/Employees";
import { EmployeeDto, Role } from "../Employees/IEmployee";
import {
  IngredientDto,
  IngredientsBase,
  ReceipeIngredient,
} from "../Ingredients/IIngredient";
import { Ingredient } from "../Ingredients/Ingredient";
import { Ingredients } from "../Ingredients/Ingredients";
import { OrderDto, OrderStatus } from "../Order/IOrder";
import { Order } from "../Order/Order";
import { Orders } from "../Order/Orders";
import { PizzaDto, PizzaType } from "../Pizzas/IPizza";
import { Pizza } from "../Pizzas/Pizza";
import { Pizzas } from "../Pizzas/Pizzas";
import { TableDto } from "../Table/ITable";
import { Table } from "../Table/Table";
import { Tables } from "../Table/Tables";
import { Validator } from "../Validator/Validator";
import { VoucherDto, WeekDay } from "../Voucher/IVoucher";
import { Voucher } from "../Voucher/Voucher";
import { Vouchers } from "../Voucher/Vouchers";
import { IPizzeria, NewOrderDto, PizzeriaResponse } from "./IPizzeria";

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
    this.addNewVoucher({
      name: "10yo",
      discount: 10,
      weekDay: WeekDay.wednesday,
    });
    this.addNewVoucher({
      name: "student",
      discount: 40,
      weekDay: WeekDay.thursday,
    });
  }

  public get margin(): number {
    return this._margin;
  }

  public set margin(value: number) {
    this._margin = value;
  }

  public hireNewEmployee(newEmployee: EmployeeDto): PizzeriaResponse {
    try {
      const employee: Employee | null =
        this.employees.addNewEmployee(newEmployee);
      if (!employee) {
        return { isSuccess: false, message: "Employee exists in database" };
      }
      return { isSuccess: true, message: "Employee created successfully" };
    } catch (error: any) {
      return { isSuccess: false, message: error.message };
    }
  }

  public purchaseNewTable(newTable: TableDto): PizzeriaResponse {
    try {
      const table: Table | null = this.tables.addNewTable(newTable);
      if (!table) {
        return { isSuccess: false, message: "Table exists in database" };
      }
      return { isSuccess: true, message: "Table purchesed successfully" };
    } catch (error: any) {
      return { isSuccess: false, message: error.message };
    }
  }

  public purchaseIngredients(IngredientDto: IngredientDto): PizzeriaResponse {
    try {
      const newIngredient: Ingredient | null =
        this.ingredients.purchaseIngredients(IngredientDto);
      if (!newIngredient) {
        return { isSuccess: true, message: "Ingredient added to stock" };
      }
      return { isSuccess: true, message: "New ingredient added to the stock" };
    } catch (error: any) {
      return { isSuccess: false, message: error.message };
    }
  }

  public addNewVoucher(newVoucher: VoucherDto): PizzeriaResponse {
    try {
      const voucher: Voucher | null = this.vouchers.addVoucher(newVoucher);
      if (!voucher) {
        return { isSuccess: false, message: "Voucher exists in database" };
      }
      return { isSuccess: true, message: "New voucher was added" };
    } catch (error: any) {
      return { isSuccess: false, message: error.message };
    }
  }

  public createPizza(pizzaDto: PizzaDto): PizzeriaResponse {
    try {
      const pizzaReceipe: Pizza | null = this.pizzas.addPizzaReceipe(pizzaDto);
      if (!pizzaReceipe) {
        return {
          isSuccess: false,
          message: "This receipe exist already in database",
        };
      }
      return { isSuccess: true, message: "New receipe added to menu" };
    } catch (error: any) {
      return { isSuccess: false, message: error.message };
    }
  }

  public getOrder(orderId: string): Order | null {
    return this.orders.getOrder(orderId) ?? null;
  }

  public makeNewOrder({
    seatsNo,
    pizzasOrdered,
    voucherName = "",
  }: NewOrderDto): PizzeriaResponse {
    try {
      Validator.validateNumberMoreOrEqualZero(seatsNo);
      Validator.validatePizzasNoInOrder(pizzasOrdered.length);
      const assignWaiter: Employee | null = this.employees.findEmployeeByRole(
        Role.waiter
      );

      if (!assignWaiter) {
        return { isSuccess: false, message: "No free waiter" };
      }

      const assignTable: Table | null = this.tables.findFreeTable(seatsNo);

      if (!assignTable) {
        return { isSuccess: false, message: "No free table." };
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
        return {
          isSuccess: false,
          message:
            "Order can't be realized, because of not enaugh ingredients. Sorry.",
        };
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
        return {
          isSuccess: true,
          message: "Success - order in queue",
          order: newOrder,
        };
      }
      return {
        isSuccess: true,
        message: "Success - order in progress",
        order: newOrder,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error.message,
      };
    }
  }

  public assignChefIfFree(orderId: string): PizzeriaResponse {
    const foundOrder: Order | null = this.orders.getOrder(orderId);
    if (!foundOrder) {
      return { isSuccess: false, message: "Order not found!" };
    }

    const assignChef = this.employees.findEmployeeByRole(Role.chef);

    if (!assignChef) {
      return { isSuccess: false, message: "No free chef for the order" };
    }

    this.employees.changeStatusOfEmployee(assignChef.id);

    return {
      isSuccess: true,
      message: "There is free chef. Your order will proceed",
    };
  }
}
