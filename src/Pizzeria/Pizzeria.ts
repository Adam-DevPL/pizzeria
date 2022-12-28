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
      weekDay: WeekDay.Wednesday,
    });
    this.addNewVoucher({
      name: "student",
      discount: 40,
      weekDay: WeekDay.Thursday,
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
      this.employees.addNewEmployee(newEmployee);

      return {
        isSuccess: true,
        message: `Employee ${newEmployee.name} created successfully`,
      };
    } catch (error: any) {
      return { isSuccess: false, message: error.message };
    }
  }

  public purchaseNewTable(newTable: TableDto): PizzeriaResponse {
    try {
      this.tables.addNewTable(newTable);
      return {
        isSuccess: true,
        message: `Table '${newTable.tableNumber}' purchesed successfully`,
      };
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
      const voucher: Voucher = this.vouchers.addVoucher(newVoucher);
      return {
        isSuccess: true,
        message: `New voucher ${newVoucher.name} was added`,
      };
    } catch (error: any) {
      return { isSuccess: false, message: error.message };
    }
  }

  public createPizza(pizzaDto: PizzaDto): PizzeriaResponse {
    try {
      this.pizzas.addPizzaReceipe(pizzaDto);
      return {
        isSuccess: true,
        message: `Receipe for ${PizzaType[pizzaDto.pizzaName]} added successfuly`,
      };
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
        Role.Waiter
      );

      if (!assignWaiter) {
        return { isSuccess: false, message: "No free waiter" };
      }

      const assignTable: Table | null = this.tables.findFreeTable(seatsNo);

      if (!assignTable) {
        return { isSuccess: false, message: "No free table." };
      }

      const pizzasToPrepare: Map<PizzaType, Pizza> =
        this.pizzas.getAllPizzasFromOrder(pizzasOrdered);

      if (pizzasToPrepare.size === 0) {
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

      const assignChef = this.employees.findEmployeeByRole(Role.Chef);

      const orderDto: OrderDto = {
        chefAssigned: assignChef,
        waiterAssigned: assignWaiter,
        tableAssigned: assignTable,
        pizzasOrdered: pizzasOrdered,
        status: assignChef ? OrderStatus.Pending : OrderStatus.Queue,
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

    const assignChef = this.employees.findEmployeeByRole(Role.Chef);

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
