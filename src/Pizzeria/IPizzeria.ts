import { EmployeeDto } from "../Employees/IEmployee";
import {
  IngredientDto,
  IngredientsBase,
  ReceipeIngredient,
} from "../Ingredients/IIngredient";
import { Order } from "../Order/Order";
import { PizzaDto, PizzaType } from "../Pizzas/IPizza";
import { TableDto } from "../Table/ITable";
import { VoucherDto } from "../Voucher/IVoucher";

export interface NewOrderDto {
  seatsNo: number;
  pizzasOrdered: PizzaType[];
  voucherName?: string;
}

export interface IPizzeria {
  hireNewEmployee(newEmployee: EmployeeDto): PizzeriaResponse;
  purchaseNewTable(newTable: TableDto): PizzeriaResponse;
  purchaseIngredients(ingredientDto: IngredientDto): PizzeriaResponse;
  addNewVoucher(newVoucher: VoucherDto): PizzeriaResponse;
  createPizza(newPizza: PizzaDto): PizzeriaResponse;
  makeNewOrder(newOrderDto: NewOrderDto): PizzeriaResponse;
  assignChefIfFree(orderId: string): PizzeriaResponse;
}

export interface PizzeriaResponse {
  isSuccess: boolean;
  message: string;
  order?: Order;
}
