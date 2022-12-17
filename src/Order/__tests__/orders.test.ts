import { expect } from "chai";
import { Employee } from "../../Employees/Employee";
import { Employees } from "../../Employees/Employees";
import { EmployeeDto, Role } from "../../Employees/IEmployee";
import {
  IngredientsBase,
  ReceipeIngredient,
} from "../../Ingredients/IIngredient";
import { PizzaType } from "../../Pizzas/IPizza";
import { Pizza } from "../../Pizzas/Pizza";
import { Pizzas } from "../../Pizzas/Pizzas";
import { TableDto } from "../../Table/ITable";
import { Table } from "../../Table/Table";
import { Tables } from "../../Table/Tables";
import { OrderDto, OrderStatus } from "../IOrder";
import { Order } from "../Order";
import { Orders } from "../Orders";

describe("Orders module", () => {
  describe("adding new order", () => {
    beforeEach(() => {
      const orders = Orders.getInstance();
      orders.getAllOrdersInProgress().clear();
      orders.getAllOrdersInQueue().clear();
    });

    it("Success - adding new order to the list in progress", () => {
      //given
      const orders = Orders.getInstance();
      const employees: Employees = Employees.getInstance();
      const tables: Tables = Tables.getInstance();
      const pizzas: Pizzas = Pizzas.getInstance();

      const chefDto: EmployeeDto = { name: "Adam", role: Role.chef };
      const waiterDto: EmployeeDto = { name: "Dawid", role: Role.waiter };
      const chef: Employee = employees.addNewEmployee(chefDto) as Employee;
      const waiter: Employee = employees.addNewEmployee(waiterDto) as Employee;

      const tableDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };
      const table: Table = tables.addNewTable(tableDto) as Table;

      const ingredientsReceipe: ReceipeIngredient[] = [
        { name: IngredientsBase.tomato, quantity: 4 },
        { name: IngredientsBase.paprika, quantity: 4 },
        { name: IngredientsBase.paprika, quantity: 4 },
      ];
      pizzas.addPizzaReceipe(PizzaType.margharita, ingredientsReceipe);
      const pizzasOrdered: PizzaType[] = [PizzaType.margharita];

      //when
      const orderDto: OrderDto = {
        chefAssigned: chef,
        waiterAssigned: waiter,
        tableAssigned: table,
        pizzasOrdered: pizzasOrdered,
        status: OrderStatus.pending,
        discount: 10,
        ingredientsCosts: 10,
        margin: 10
      };
      const newOrder: Order | null = orders.addNewOrder(orderDto);
      const orderInProgress: Order | undefined = orders
        .getAllOrdersInProgress()
        .get(newOrder.id);

      //then
      expect(newOrder).to.not.null;
      expect(orderInProgress).to.not.null;
      expect(newOrder.chefAssigned?.id).to.equal(chef.id);
    });

    it("Success - adding new order to the list in queue", () => {
      //given
      const orders = Orders.getInstance();
      const employees: Employees = Employees.getInstance();
      const tables: Tables = Tables.getInstance();
      const pizzas: Pizzas = Pizzas.getInstance();

      const waiterDto: EmployeeDto = { name: "Dawid", role: Role.waiter };
      const waiter: Employee = employees.addNewEmployee(waiterDto) as Employee;

      const tableDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };
      const table: Table = tables.addNewTable(tableDto) as Table;

      const ingredientsReceipe: ReceipeIngredient[] = [
        { name: IngredientsBase.tomato, quantity: 4 },
        { name: IngredientsBase.paprika, quantity: 4 },
        { name: IngredientsBase.paprika, quantity: 4 },
      ];
      pizzas.addPizzaReceipe(PizzaType.margharita, ingredientsReceipe);
      const pizzasOrdered: PizzaType[] = [PizzaType.margharita];

      //when
      const orderDto: OrderDto = {
        chefAssigned: null,
        waiterAssigned: waiter,
        tableAssigned: table,
        pizzasOrdered: pizzasOrdered,
        status: OrderStatus.queue,
        discount: 10,
        ingredientsCosts: 10,
        margin: 10
      };
      const newOrder: Order | null = orders.addNewOrder(orderDto);
      const orderInQueue: Order | undefined = orders
        .getAllOrdersInProgress()
        .get(newOrder.id);

      //then
      expect(newOrder).to.not.null;
      expect(orderInQueue).to.not.null;
    });

    it("Failure - pizzas ordered can't be empty", () => {
      //given
      const orders = Orders.getInstance();
      const employees: Employees = Employees.getInstance();
      const tables: Tables = Tables.getInstance();
      const pizzas: Pizzas = Pizzas.getInstance();

      const waiterDto: EmployeeDto = { name: "Dawid", role: Role.waiter };
      const waiter: Employee = employees.addNewEmployee(waiterDto) as Employee;

      const tableDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };
      const table: Table = tables.addNewTable(tableDto) as Table;

      const ingredientsReceipe: ReceipeIngredient[] = [
        { name: IngredientsBase.tomato, quantity: 4 },
        { name: IngredientsBase.paprika, quantity: 4 },
        { name: IngredientsBase.paprika, quantity: 4 },
      ];
      pizzas.addPizzaReceipe(PizzaType.margharita, ingredientsReceipe);
      const pizzasOrdered: PizzaType[] = [];

      //when
      const orderDto: OrderDto = {
        chefAssigned: null,
        waiterAssigned: waiter,
        tableAssigned: table,
        pizzasOrdered: pizzasOrdered,
        status: OrderStatus.queue,
        discount: 10,
        ingredientsCosts: 10,
        margin: 10
      };

      //then
      expect(function() {orders.addNewOrder(orderDto)}).to.throw(Error);
    });

    it("Failure - discount can't be lower then 0 or more then 100", () => {
      //given
      const orders = Orders.getInstance();
      const employees: Employees = Employees.getInstance();
      const tables: Tables = Tables.getInstance();
      const pizzas: Pizzas = Pizzas.getInstance();

      const waiterDto: EmployeeDto = { name: "Dawid", role: Role.waiter };
      const waiter: Employee = employees.addNewEmployee(waiterDto) as Employee;

      const tableDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };
      const table: Table = tables.addNewTable(tableDto) as Table;

      const ingredientsReceipe: ReceipeIngredient[] = [
        { name: IngredientsBase.tomato, quantity: 4 },
        { name: IngredientsBase.paprika, quantity: 4 },
        { name: IngredientsBase.paprika, quantity: 4 },
      ];
      pizzas.addPizzaReceipe(PizzaType.margharita, ingredientsReceipe);
      const pizzasOrdered: PizzaType[] = [PizzaType.margharita];

      //when
      const orderDto: OrderDto = {
        chefAssigned: null,
        waiterAssigned: waiter,
        tableAssigned: table,
        pizzasOrdered: pizzasOrdered,
        status: OrderStatus.queue,
        discount: -1,
        ingredientsCosts: 10,
        margin: 10
      };

      //then
      expect(function() {orders.addNewOrder(orderDto)}).to.throw(Error);
    });
    it("Failure - cost of ingredients can't be 0", () => {
      //given
      const orders = Orders.getInstance();
      const employees: Employees = Employees.getInstance();
      const tables: Tables = Tables.getInstance();
      const pizzas: Pizzas = Pizzas.getInstance();

      const waiterDto: EmployeeDto = { name: "Dawid", role: Role.waiter };
      const waiter: Employee = employees.addNewEmployee(waiterDto) as Employee;

      const tableDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };
      const table: Table = tables.addNewTable(tableDto) as Table;

      const ingredientsReceipe: ReceipeIngredient[] = [
        { name: IngredientsBase.tomato, quantity: 4 },
        { name: IngredientsBase.paprika, quantity: 4 },
        { name: IngredientsBase.paprika, quantity: 4 },
      ];
      pizzas.addPizzaReceipe(PizzaType.margharita, ingredientsReceipe);
      const pizzasOrdered: PizzaType[] = [PizzaType.margharita];

      //when
      const orderDto: OrderDto = {
        chefAssigned: null,
        waiterAssigned: waiter,
        tableAssigned: table,
        pizzasOrdered: pizzasOrdered,
        status: OrderStatus.queue,
        discount: 1,
        ingredientsCosts: 0,
        margin: 10
      };

      //then
      expect(function() {orders.addNewOrder(orderDto)}).to.throw(Error);
    });

    it("Failure - margin can't be 0", () => {
      //given
      const orders = Orders.getInstance();
      const employees: Employees = Employees.getInstance();
      const tables: Tables = Tables.getInstance();
      const pizzas: Pizzas = Pizzas.getInstance();

      const waiterDto: EmployeeDto = { name: "Dawid", role: Role.waiter };
      const waiter: Employee = employees.addNewEmployee(waiterDto) as Employee;

      const tableDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };
      const table: Table = tables.addNewTable(tableDto) as Table;

      const ingredientsReceipe: ReceipeIngredient[] = [
        { name: IngredientsBase.tomato, quantity: 4 },
        { name: IngredientsBase.paprika, quantity: 4 },
        { name: IngredientsBase.paprika, quantity: 4 },
      ];
      pizzas.addPizzaReceipe(PizzaType.margharita, ingredientsReceipe);
      const pizzasOrdered: PizzaType[] = [PizzaType.margharita];

      //when
      const orderDto: OrderDto = {
        chefAssigned: null,
        waiterAssigned: waiter,
        tableAssigned: table,
        pizzasOrdered: pizzasOrdered,
        status: OrderStatus.queue,
        discount: 1,
        ingredientsCosts: 10,
        margin: 0
      };

      //then
      expect(function() {orders.addNewOrder(orderDto)}).to.throw(Error);
    });
  });
});
