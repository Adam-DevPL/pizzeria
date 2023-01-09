import { EmployeeDto } from "../Employees/Employee.types";
import { IngredientDto } from "../Ingredients/Ingredient.types";
import { Order } from "../Order/Order";
import { PizzaDto, PizzaType } from "../Pizzas/Pizza.types";
import { TableDto } from "../Table/Table.types";
import { VoucherDto } from "../Voucher/Voucher.types";

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
