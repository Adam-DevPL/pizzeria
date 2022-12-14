import { expect } from "chai";
import { Employee } from "../../Employees/Employee";
import { Employees } from "../../Employees/Employees";
import { Role } from "../../Employees/IEmployee";
import {
  IngredientsBase,
  ReceipeIngredient,
} from "../../Ingredients/IIngredient";
import { PizzaType } from "../../Pizzas/IPizza";
import { Pizza } from "../../Pizzas/Pizza";
import { Pizzas } from "../../Pizzas/Pizzas";
import { Table } from "../../Table/Table";
import { Tables } from "../../Table/Tables";
import { OrderStatus } from "../IOrder";
import { Order } from "../Order";
import { Orders } from "../Orders";

describe("Orders module", () => {
  describe("adding new order", () => {
    beforeEach(() => {
      const orders = Orders.getInstance();
      orders.getAllOrders().clear();
    });
    it("Success - adding new order to the list", () => {
      const orders = Orders.getInstance();
      const employees: Employees = Employees.getInstance();
      const tables: Tables = Tables.getInstance();
      const pizzas: Pizzas = Pizzas.getInstance();

      const orderStatus: OrderStatus = OrderStatus.processing;
      // const waiter: Employee | null = employees.addNewEmployee(
      //   "Adam",
      //   Role.waiter
      // );
      // const chef: Employee | null = employees.addNewEmployee(
      //   "Dawid",
      //   Role.chef
      // );
      const table: Table | null = tables.addNewTable(1, 4);
      const ingredientsReceipe: ReceipeIngredient[] = [
        { name: IngredientsBase.tomato, quantity: 4 },
        { name: IngredientsBase.paprika, quantity: 4 },
      ];
      pizzas.addPizzaReceipe(PizzaType.margharita, ingredientsReceipe);
      const pizzasOrdered: PizzaType[] = [PizzaType.margharita];

      let newOrder: Order | null = null;

      // if (waiter) {
      //   newOrder = orders.addNewOrder(
      //     orderStatus,
      //     chef,
      //     waiter,
      //     table,
      //     pizzasOrdered
      //   );
      // }

      // expect(newOrder ? newOrder.chefAssigned?.name : null).to.equal(chef?.name)
      // expect(newOrder ? newOrder.orderStatus : null).to.equal(OrderStatus.processing)
    });
  });
});
