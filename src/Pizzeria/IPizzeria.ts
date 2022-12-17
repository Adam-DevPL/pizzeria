import { EmployeeDto } from "../Employees/IEmployee";
import { IngredientsBase, ReceipeIngredient } from "../Ingredients/IIngredient";
import { PizzaType } from "../Pizzas/IPizza";
import { TableDto } from "../Table/ITable";
import { VoucherDto } from "../Voucher/IVoucher";

export interface IPizzeria {
  hireNewEmployee(newEmployee: EmployeeDto): string;
  purchaseNewTable(newTable: TableDto): string;
  purchaseIngredients(
    ingredient: IngredientsBase,
    quantity: number,
    price: number
  ): string;
  addNewVoucher(newVoucher: VoucherDto): string;
  createPizza(name: PizzaType, ingredients: ReceipeIngredient[]): string;
  makeNewOrder(
    seatsNo: number,
    pizzasOrdered: PizzaType[],
    voucherName: string,
    margin: number
  ): string;
  assignChefIfFree(orderId: string): string;
}
