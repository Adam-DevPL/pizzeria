import { EmployeeDto } from "../Employees/IEmployee";
import {
  IngredientDto,
  IngredientsBase,
  ReceipeIngredient,
} from "../Ingredients/IIngredient";
import { PizzaDto, PizzaType } from "../Pizzas/IPizza";
import { TableDto } from "../Table/ITable";
import { VoucherDto } from "../Voucher/IVoucher";

export interface IPizzeria {
  hireNewEmployee(newEmployee: EmployeeDto): PizzeriaResponse;
  purchaseNewTable(newTable: TableDto): PizzeriaResponse;
  purchaseIngredients(ingredientDto: IngredientDto): PizzeriaResponse;
  addNewVoucher(newVoucher: VoucherDto): PizzeriaResponse;
  createPizza(newPizza: PizzaDto): PizzeriaResponse;
  makeNewOrder(
    seatsNo: number,
    pizzasOrdered: PizzaType[],
    voucherName: string,
    margin: number
  ): string;
  assignChefIfFree(orderId: string): string;
}

export interface PizzeriaResponse {
  isSuccess: boolean;
  message: string;
}
