import { expect } from "chai";
import { Employee } from "../../Employees/Employee";
import { Employees } from "../../Employees/Employee.service";
import { EmployeeDto, Role } from "../../Employees/Employee.types";
import {
  IngredientsBase,
  ReceipeIngredient,
} from "../../Ingredients/Ingredient.types";
import { PizzaDto, PizzaType } from "../../Pizzas/Pizza.types";
import { Pizzas } from "../../Pizzas/Pizza.service";
import { TableDto } from "../../Table/Table.types";
import { Table } from "../../Table/Table";
import { Tables } from "../../Table/Table.service";
import { OrderDto, OrderStatus } from "../Order.types";
import { Order } from "../Order";
import { Orders } from "../Order.service";

function formEmployeesData(): Employees {
  const employees = new Employees();
  const chefDto: EmployeeDto = { name: "Adam", role: Role.Chef };
  const waiterDto: EmployeeDto = { name: "Dawid", role: Role.Waiter };
  employees.addNewEmployee(chefDto);
  employees.addNewEmployee(waiterDto);
  return employees;
}

function formTablesData(): Tables {
  const tables: Tables = new Tables();
  const tableDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };
  tables.addNewTable(tableDto);
  return tables;
}

describe("Orders module", () => {
  // describe("adding new order", () => {
  // beforeEach(() => {
  //   const orders = Orders.getInstance();
  //   const employees: Employees = Employees.getInstance();
  //   const tables: Tables = Tables.getInstance();
  //   const pizzas: Pizzas = Pizzas.getInstance();
  //   const chefDto: EmployeeDto = { name: "Adam", role: Role.Chef };
  //   const waiterDto: EmployeeDto = { name: "Dawid", role: Role.Waiter };
  //   employees.addNewEmployee(chefDto);
  //   employees.addNewEmployee(waiterDto);

  //   const tableDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };
  //   tables.addNewTable(tableDto);

  //   const ingredientsReceipe: ReceipeIngredient[] = [
  //     { name: IngredientsBase.Tomato, quantity: 4 },
  //     { name: IngredientsBase.Paprika, quantity: 4 },
  //     { name: IngredientsBase.Paprika, quantity: 4 },
  //   ];
  //   const pizzaDto: PizzaDto = {
  //     pizzaName: PizzaType.Margharita,
  //     ingredients: ingredientsReceipe,
  //   };
  //   pizzas.addPizzaReceipe(pizzaDto);
  // });

  // afterEach(() => {
  //   const orders = Orders.getInstance();
  //   const employees: Employees = Employees.getInstance();
  //   const tables: Tables = Tables.getInstance();
  //   const pizzas: Pizzas = Pizzas.getInstance();
  //   orders.getAllOrdersInProgress().clear();
  //   orders.getAllOrdersInQueue().clear();
  //   employees.getAllFreeEmployees().clear();
  //   employees.getAllOccupiedEmployees().clear();
  //   tables.getAllFreeTables().clear();
  //   tables.getAllOccupiedTables().clear();
  //   pizzas.getAllReceipes().clear();
  // });

  it("Success - adding new order to the list in progress", () => {
    //given
    const orders = new Orders();
    const employees: Employees = formEmployeesData();
    const tables: Tables = formTablesData();

    const pizzasOrdered: PizzaType[] = [PizzaType.Margharita];

    //when
    const orderDto: OrderDto = {
      chefAssigned: employees.findEmployeeByRole(Role.Chef),
      waiterAssigned: employees.findEmployeeByRole(Role.Waiter) as Employee,
      tableAssigned: tables.findFreeTable(4) as Table,
      pizzasOrdered: pizzasOrdered,
      status: OrderStatus.Pending,
      discount: 10,
      ingredientsCosts: 10,
      margin: 10,
    };
    const newOrder: Order | null = orders.addNewOrder(orderDto);
    const orderInProgress: Order | undefined = orders
      .getAllOrdersInProgress()
      .get(newOrder.id);

    //then
    expect(newOrder.id).to.equal(orderInProgress?.id);
  });

  it("Success - adding new order to the list in queue", () => {
    //given
    const orders = new Orders();
    const employees: Employees = formEmployeesData()
    const tables: Tables = formTablesData();

    employees.removeEmployee(
      employees.findEmployeeByRole(Role.Chef)?.id as string
    );
    const pizzasOrdered: PizzaType[] = [PizzaType.Margharita];

    //when
    const orderDto: OrderDto = {
      chefAssigned: null,
      waiterAssigned: employees.findEmployeeByRole(Role.Waiter) as Employee,
      tableAssigned: tables.findFreeTable(4) as Table,
      pizzasOrdered: pizzasOrdered,
      status: OrderStatus.Queue,
      discount: 10,
      ingredientsCosts: 10,
      margin: 10,
    };
    const newOrder: Order | null = orders.addNewOrder(orderDto);
    const orderInQueue: Order | undefined = orders
      .getAllOrdersInQueue()
      .get(newOrder.id);

    //then
    expect(newOrder.id).to.equal(orderInQueue?.id);
  });

  it("Failure - pizzas ordered can't be empty", () => {
    //given
    const orders = new Orders();
    const employees: Employees = formEmployeesData();
    const tables: Tables = formTablesData();

    const pizzasOrdered: PizzaType[] = [];

    //when
    const orderDto: OrderDto = {
      chefAssigned: null,
      waiterAssigned: employees.findEmployeeByRole(Role.Waiter) as Employee,
      tableAssigned: tables.findFreeTable(4) as Table,
      pizzasOrdered: pizzasOrdered,
      status: OrderStatus.Queue,
      discount: 10,
      ingredientsCosts: 10,
      margin: 10,
    };

    //then
    expect(function () {
      orders.addNewOrder(orderDto);
    }).to.throw(Error);
  });

  it("Failure - discount can't be lower then 0 or more then 100", () => {
    //given
    const orders = new Orders();
    const employees: Employees = formEmployeesData();
    const tables: Tables = formTablesData();

    const pizzasOrdered: PizzaType[] = [PizzaType.Margharita];

    //when
    const orderDto: OrderDto = {
      chefAssigned: null,
      waiterAssigned: employees.findEmployeeByRole(Role.Waiter) as Employee,
      tableAssigned: tables.findFreeTable(4) as Table,
      pizzasOrdered: pizzasOrdered,
      status: OrderStatus.Queue,
      discount: -1,
      ingredientsCosts: 10,
      margin: 10,
    };

    //then
    expect(function () {
      orders.addNewOrder(orderDto);
    }).to.throw(Error);
  });
  it("Failure - cost of ingredients can't be 0", () => {
    //given
    const orders = new Orders();
    const employees: Employees = formEmployeesData();
    const tables: Tables = formTablesData();

    const pizzasOrdered: PizzaType[] = [PizzaType.Margharita];

    //when
    const orderDto: OrderDto = {
      chefAssigned: null,
      waiterAssigned: employees.findEmployeeByRole(Role.Waiter) as Employee,
      tableAssigned: tables.findFreeTable(4) as Table,
      pizzasOrdered: pizzasOrdered,
      status: OrderStatus.Queue,
      discount: 1,
      ingredientsCosts: 0,
      margin: 10,
    };

    //then
    expect(function () {
      orders.addNewOrder(orderDto);
    }).to.throw(Error);
  });

  it("Failure - margin can't be 0", () => {
    //given
    const orders = new Orders();
    const employees: Employees = formEmployeesData();
    const tables: Tables = formTablesData();

    const pizzasOrdered: PizzaType[] = [PizzaType.Margharita];

    //when
    const orderDto: OrderDto = {
      chefAssigned: null,
      waiterAssigned: employees.findEmployeeByRole(Role.Waiter) as Employee,
      tableAssigned: tables.findFreeTable(4) as Table,
      pizzasOrdered: pizzasOrdered,
      status: OrderStatus.Queue,
      discount: 1,
      ingredientsCosts: 10,
      margin: 0,
    };

    //then
    expect(function () {
      orders.addNewOrder(orderDto);
    }).to.throw(Error);
  });
});
// });
