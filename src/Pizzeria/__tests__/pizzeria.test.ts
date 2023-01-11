// import { expect } from "chai";
// import { Employees } from "../../Employees/Employee.service";
// import { EmployeeDto, Role } from "../../Employees/Employee.types";
// import {
//   IngredientDto,
//   IngredientsBase,
//   ReceipeIngredient,
// } from "../../Ingredients/Ingredient.types";
// import { Ingredients } from "../../Ingredients/Ingredient.service";
// import { Order } from "../../Order/Order";
// import { PizzaDto, PizzaType } from "../../Pizzas/Pizza.types";
// import { Pizzas } from "../../Pizzas/Pizza.service";
// import { TableDto } from "../../Table/Table.types";
// import { Tables } from "../../Table/Table.service";
// import { VoucherDto } from "../../Voucher/Voucher.types";
// import { Vouchers } from "../../Voucher/Voucher.service";
// import { PizzeriaResponse } from "../Pizzeria.types";
// import { Pizzeria } from "../Pizzeria.service";

// function getPizzeriaObjectWithSettings(): Pizzeria {
//   const pizzeria: Pizzeria = new Pizzeria();
//   const waiterMsg: PizzeriaResponse = pizzeria.hireNewEmployee({
//     name: "Adam",
//     role: Role.Waiter,
//   });
//   const tabelMsg: PizzeriaResponse = pizzeria.purchaseNewTable({
//     tableNumber: 1,
//     numberOfSeats: 4,
//   });

//   const ingr1: PizzeriaResponse = pizzeria.purchaseIngredients({
//     name: IngredientsBase.Potato,
//     price: 4,
//     quantity: 4,
//   });
//   const ingr2: PizzeriaResponse = pizzeria.purchaseIngredients({
//     name: IngredientsBase.Tomato,
//     price: 4,
//     quantity: 4,
//   });
//   const ingr3: PizzeriaResponse = pizzeria.purchaseIngredients({
//     name: IngredientsBase.Olives,
//     price: 4,
//     quantity: 4,
//   });

//   const pizza: PizzeriaResponse = pizzeria.createPizza({
//     pizzaName: PizzaType.Margharita,
//     ingredients: [
//       { name: IngredientsBase.Potato, quantity: 1 },
//       { name: IngredientsBase.Tomato, quantity: 1 },
//       { name: IngredientsBase.Olives, quantity: 1 },
//     ],
//   });

//   const voucherMsg: PizzeriaResponse = pizzeria.addNewVoucher({
//     name: "special",
//     discount: 10,
//     weekDay: null,
//   });
//   const chefMsg: PizzeriaResponse = pizzeria.hireNewEmployee({
//     name: "Dawid",
//     role: Role.Chef,
//   });

//   return pizzeria;
// }

// describe("Pizzeria module", () => {
//   describe("hire new employee", () => {
//     beforeEach(() => {
//       const employees: Employees = Employees.getInstance();
//       employees.getAllFreeEmployees().clear();
//       employees.getAllOccupiedEmployees().clear();
//     });

//     it("Success - hire new employee - Employee created successfully", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const employeeDto: EmployeeDto = { name: "Adam", role: Role.Chef };

//       //when
//       const newEmployeeResponse: PizzeriaResponse =
//         pizzeria.hireNewEmployee(employeeDto);

//       //then
//       expect(newEmployeeResponse.isSuccess).to.true;
//       expect(newEmployeeResponse.message).to.equal(
//         "Employee Adam created successfully"
//       );
//     });

//     it("Failure - hire new employee - Employee exists in database", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const employeeDto: EmployeeDto = { name: "Adam", role: Role.Chef };

//       //when
//       pizzeria.hireNewEmployee(employeeDto);
//       const duplicatedEmployeeResp: PizzeriaResponse =
//         pizzeria.hireNewEmployee(employeeDto);

//       //then
//       expect(duplicatedEmployeeResp.isSuccess).to.false;
//       expect(duplicatedEmployeeResp.message).to.equal(
//         "Employee Adam already exists"
//       );
//     });

//     it("Failure - hire new employee - It's not valid name or it's empty", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const employeeDto: EmployeeDto = { name: "", role: Role.Chef };

//       //when
//       const errorResp: PizzeriaResponse = pizzeria.hireNewEmployee(employeeDto);

//       //then
//       expect(errorResp.isSuccess).to.false;
//       expect(errorResp.message).to.equal("It's not valid name or it's empty");
//     });
//   });
//   describe("purchase new table", () => {
//     beforeEach(() => {
//       const tables: Tables = Tables.getInstance();
//       tables.getAllFreeTables().clear();
//       tables.getAllOccupiedTables().clear();
//     });

//     it("Success - purchase new table - Table purchesed successfully", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const tabeDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };

//       //when
//       const newTableResponse: PizzeriaResponse =
//         pizzeria.purchaseNewTable(tabeDto);

//       //then
//       expect(newTableResponse.isSuccess).to.true;
//       expect(newTableResponse.message).to.equal(
//         "Table '1' purchesed successfully"
//       );
//     });

//     it("Failure - purchase new table - Table exists in database", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const tabeDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };

//       //when
//       pizzeria.purchaseNewTable(tabeDto);
//       const newTableResponse: PizzeriaResponse =
//         pizzeria.purchaseNewTable(tabeDto);

//       //then
//       expect(newTableResponse.isSuccess).to.false;
//       expect(newTableResponse.message).to.equal("Table '1' already exists");
//     });

//     it("Failure - purchase new table - The table number must be greater than zero!", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const tabeDto: TableDto = { tableNumber: 0, numberOfSeats: 4 };

//       //when
//       const newTableResponse: PizzeriaResponse =
//         pizzeria.purchaseNewTable(tabeDto);

//       //then
//       expect(newTableResponse.isSuccess).to.false;
//       expect(newTableResponse.message).to.equal(
//         "The number must be greater than zero!"
//       );
//     });

//     it("Failure - purchase new table - The number of seats must be greater than zero!", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const tabeDto: TableDto = { tableNumber: 1, numberOfSeats: 0 };

//       //when
//       const newTableResponse: PizzeriaResponse =
//         pizzeria.purchaseNewTable(tabeDto);

//       //then
//       expect(newTableResponse.isSuccess).to.false;
//       expect(newTableResponse.message).to.equal(
//         "The number must be greater than zero!"
//       );
//     });
//   });

//   describe("adding new voucher", () => {
//     beforeEach(() => {
//       const vouchers: Vouchers = Vouchers.getInstance();
//       vouchers.getAllVouchers().clear();
//     });

//     it("Success - added new voucher to db - New voucher was added", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const voucherDto: VoucherDto = {
//         name: "special",
//         discount: 10,
//         weekDay: null,
//       };

//       //when
//       const newVoucherResp: PizzeriaResponse =
//         pizzeria.addNewVoucher(voucherDto);

//       //then
//       expect(newVoucherResp.isSuccess).to.true;
//       expect(newVoucherResp.message).to.equal("New voucher special was added");
//     });

//     it("Failure - adding new voucher witch exit in db - Voucher exists in database", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const voucherDto: VoucherDto = {
//         name: "special",
//         discount: 10,
//         weekDay: null,
//       };

//       //when
//       pizzeria.addNewVoucher(voucherDto);
//       const newVoucherResp: PizzeriaResponse =
//         pizzeria.addNewVoucher(voucherDto);

//       //then
//       expect(newVoucherResp.isSuccess).to.false;
//       expect(newVoucherResp.message).to.equal("Voucher special already exists");
//     });

//     it("Failure - adding new voucher with empty name - The name can't be empty", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const voucherDto: VoucherDto = { name: "", discount: 10, weekDay: null };

//       //when
//       const newVoucherResp: PizzeriaResponse =
//         pizzeria.addNewVoucher(voucherDto);

//       //then
//       expect(newVoucherResp.isSuccess).to.false;
//       expect(newVoucherResp.message).to.equal("The name can't be empty");
//     });

//     it("Failure - adding new voucher with discount below 0 - Discount can't be less then zero or greater then 100", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const voucherDto: VoucherDto = {
//         name: "special",
//         discount: -1,
//         weekDay: null,
//       };

//       //when
//       const newVoucherResp: PizzeriaResponse =
//         pizzeria.addNewVoucher(voucherDto);

//       //then
//       expect(newVoucherResp.isSuccess).to.false;
//       expect(newVoucherResp.message).to.equal(
//         "Discount can't be less then zero or greater then 100"
//       );
//     });
//   });

//   describe("adding new pizza receipe", () => {
//     beforeEach(() => {
//       const pizzas: Pizzas = Pizzas.getInstance();
//       pizzas.getAllReceipes().clear();
//     });

//     it("Success - adding new pizza receipe - New receipe added to menu", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const margharita: PizzaType = PizzaType.Margharita;
//       const ingredientsForPizza: ReceipeIngredient[] = [
//         { name: IngredientsBase.Ananas, quantity: 1 },
//         { name: IngredientsBase.Olives, quantity: 4 },
//         { name: IngredientsBase.Tomato, quantity: 2 },
//       ];
//       const pizzaDto: PizzaDto = {
//         pizzaName: margharita,
//         ingredients: ingredientsForPizza,
//       };

//       //when
//       const newPizzaResp: PizzeriaResponse = pizzeria.createPizza(pizzaDto);

//       //then
//       expect(newPizzaResp.isSuccess).to.true;
//       expect(newPizzaResp.message).to.equal(
//         "Receipe for Margharita added successfuly"
//       );
//     });

//     it("Failure - adding new receipe when it already exists - This receipe exist already in database", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const margharita: PizzaType = PizzaType.Margharita;
//       const ingredientsForPizza: ReceipeIngredient[] = [
//         { name: IngredientsBase.Ananas, quantity: 1 },
//         { name: IngredientsBase.Olives, quantity: 4 },
//         { name: IngredientsBase.Tomato, quantity: 2 },
//       ];
//       const pizzaDto: PizzaDto = {
//         pizzaName: margharita,
//         ingredients: ingredientsForPizza,
//       };

//       //when
//       pizzeria.createPizza(pizzaDto);
//       const newPizzaResp: PizzeriaResponse = pizzeria.createPizza(pizzaDto);

//       //then
//       expect(newPizzaResp.isSuccess).to.false;
//       expect(newPizzaResp.message).to.equal(
//         "Pizza receipe Margharita already exists"
//       );
//     });

//     it("Failure - adding new receipe with empty ingredients - Not enaught ingredients to create pizza receipe", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const margharita: PizzaType = PizzaType.Margharita;
//       const ingredientsForPizza: ReceipeIngredient[] = [];
//       const pizzaDto: PizzaDto = {
//         pizzaName: margharita,
//         ingredients: ingredientsForPizza,
//       };

//       //when
//       const newPizzaResp: PizzeriaResponse = pizzeria.createPizza(pizzaDto);

//       //then
//       expect(newPizzaResp.isSuccess).to.false;
//       expect(newPizzaResp.message).to.equal(
//         "Not enaught ingredients to create pizza receipe"
//       );
//     });
//   });

//   describe("purchasing new ingredient", () => {
//     beforeEach(() => {
//       const ingredients: Ingredients = Ingredients.getInstance();
//       ingredients.getAllIngredients().clear();
//     });

//     it("Success - purchasing new ingredient - New ingredient added to the stock", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const ingredientOlivesDto: IngredientDto = {
//         name: IngredientsBase.Olives,
//         price: 4,
//         quantity: 1,
//       };

//       //when
//       const newIngredientResp: PizzeriaResponse =
//         pizzeria.purchaseIngredients(ingredientOlivesDto);

//       //then
//       expect(newIngredientResp.isSuccess).to.true;
//       expect(newIngredientResp.message).to.equal(
//         "New ingredient added to the stock"
//       );
//     });

//     it("Success - purchasing ingredient that already exists - Ingredient added to stock", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const ingredientOlivesDto: IngredientDto = {
//         name: IngredientsBase.Olives,
//         price: 4,
//         quantity: 1,
//       };

//       //when
//       pizzeria.purchaseIngredients(ingredientOlivesDto);
//       const newIngredientResp: PizzeriaResponse =
//         pizzeria.purchaseIngredients(ingredientOlivesDto);

//       //then
//       expect(newIngredientResp.isSuccess).to.true;
//       expect(newIngredientResp.message).to.equal("Ingredient added to stock");
//     });

//     it("Failure - adding new ingredient with 0 price - The price must be more tehn zero", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const ingredientOlivesDto: IngredientDto = {
//         name: IngredientsBase.Olives,
//         price: 0,
//         quantity: 1,
//       };

//       //when
//       const newIngredientResp: PizzeriaResponse =
//         pizzeria.purchaseIngredients(ingredientOlivesDto);

//       //then
//       expect(newIngredientResp.isSuccess).to.false;
//       expect(newIngredientResp.message).to.equal(
//         "The price must be more tehn zero"
//       );
//     });

//     it("Failure - adding new ingredient with -1 quantity - The quantity is less then zero!", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const ingredientOlivesDto: IngredientDto = {
//         name: IngredientsBase.Olives,
//         price: 1,
//         quantity: -1,
//       };

//       //when
//       const newIngredientResp: PizzeriaResponse =
//         pizzeria.purchaseIngredients(ingredientOlivesDto);

//       //then
//       expect(newIngredientResp.isSuccess).to.false;
//       expect(newIngredientResp.message).to.equal(
//         "The quantity is less then zero!"
//       );
//     });
//   });

//   describe("make new order", () => {
//     beforeEach(() => {
//       const employees: Employees = Employees.getInstance();
//       employees.getAllFreeEmployees().clear();
//       employees.getAllOccupiedEmployees().clear();
//       const tables: Tables = Tables.getInstance();
//       tables.getAllFreeTables().clear();
//       tables.getAllOccupiedTables().clear();
//       const vouchers: Vouchers = Vouchers.getInstance();
//       vouchers.getAllVouchers().clear();
//       const pizzas: Pizzas = Pizzas.getInstance();
//       pizzas.getAllReceipes().clear();
//       const ingredients: Ingredients = Ingredients.getInstance();
//       ingredients.getAllIngredients().clear();
//     });

//     it("Success - succesfully created order in progress", () => {
//       //given
//       const pizzeria: Pizzeria = getPizzeriaObjectWithSettings();

//       //when
//       const outcome: PizzeriaResponse = pizzeria.makeNewOrder({
//         seatsNo: 4,
//         pizzasOrdered: [PizzaType.Margharita],
//         voucherName: "special",
//       });

//       //then
//       expect(outcome.isSuccess).to.true;
//       expect(outcome.message).to.equal("Success - order in progress");
//       expect(outcome.order?.chefAssigned?.name).to.equal("Dawid");
//       expect(outcome.order?.finalPrice).to.equal(19.8);
//     });

//     it("Success - succesfully created order in queue", () => {
//       //given
//       const pizzeria: Pizzeria = getPizzeriaObjectWithSettings();
//       const employees: Employees = Employees.getInstance();
//       employees.removeEmployee(
//         employees.findEmployeeByRole(Role.Chef)?.id as string
//       );
//       //when
//       const outcome: PizzeriaResponse = pizzeria.makeNewOrder({
//         seatsNo: 4,
//         pizzasOrdered: [PizzaType.Margharita],
//         voucherName: "special",
//       });

//       //then
//       expect(outcome.isSuccess).to.true;
//       expect(outcome.message).to.equal("Success - order in queue");
//       expect(outcome.order?.tableAssigned.tableNumber).to.equal(1);
//       expect(outcome.order?.finalPrice).to.equal(19.8);
//     });

//     it("Failure - no free table", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const waiterMsg: PizzeriaResponse = pizzeria.hireNewEmployee({
//         name: "Adam",
//         role: Role.Waiter,
//       });

//       //when
//       const outcome: PizzeriaResponse = pizzeria.makeNewOrder({
//         seatsNo: 4,
//         pizzasOrdered: [PizzaType.Margharita],
//         voucherName: "special",
//       });

//       //then
//       expect(outcome.isSuccess).to.false;
//       expect(outcome.message).to.equal("There is no free table for 4 seat(s)");
//     });

//     it("Failure - not any pizza receipies for ordered pizzas", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const waiterMsg: PizzeriaResponse = pizzeria.hireNewEmployee({
//         name: "Adam",
//         role: Role.Waiter,
//       });
//       const tabelMsg: PizzeriaResponse = pizzeria.purchaseNewTable({
//         tableNumber: 1,
//         numberOfSeats: 4,
//       });

//       //when
//       const outcome: PizzeriaResponse = pizzeria.makeNewOrder({
//         seatsNo: 4,
//         pizzasOrdered: [PizzaType.Margharita],
//         voucherName: "special",
//       });

//       //then
//       expect(outcome.isSuccess).to.false;
//       expect(outcome.message).to.equal(
//         "There is no pizza receipe in the menu!"
//       );
//     });

//     it("Failure - not enaugh ingredients to make the order", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();
//       const waiterMsg: PizzeriaResponse = pizzeria.hireNewEmployee({
//         name: "Adam",
//         role: Role.Waiter,
//       });
//       const tabelMsg: PizzeriaResponse = pizzeria.purchaseNewTable({
//         tableNumber: 1,
//         numberOfSeats: 4,
//       });

//       const pizza: PizzeriaResponse = pizzeria.createPizza({
//         pizzaName: PizzaType.Margharita,
//         ingredients: [
//           { name: IngredientsBase.Potato, quantity: 1 },
//           { name: IngredientsBase.Tomato, quantity: 1 },
//           { name: IngredientsBase.Olives, quantity: 1 },
//         ],
//       });

//       //when
//       const outcome: PizzeriaResponse = pizzeria.makeNewOrder({
//         seatsNo: 4,
//         pizzasOrdered: [PizzaType.Margharita],
//         voucherName: "special",
//       });

//       //then
//       expect(outcome.isSuccess).to.false;
//       expect(outcome.message).to.equal(
//         "Order can't be realized, because of not enaugh ingredients. Sorry."
//       );
//     });

//     it("Failure - can't create order fo table with 0 seats", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();

//       //when
//       const outcome: PizzeriaResponse = pizzeria.makeNewOrder({
//         seatsNo: 0,
//         pizzasOrdered: [PizzaType.Margharita],
//         voucherName: "special",
//       });

//       //then
//       expect(outcome.isSuccess).to.false;
//       expect(outcome.message).to.equal("The number must be greater than zero!");
//     });

//     it("Failure - can't create order with no pizza", () => {
//       //given
//       const pizzeria: Pizzeria = new Pizzeria();

//       //when
//       const outcome: PizzeriaResponse = pizzeria.makeNewOrder({
//         seatsNo: 2,
//         pizzasOrdered: [],
//         voucherName: "special",
//       });

//       //then
//       expect(outcome.isSuccess).to.false;
//       expect(outcome.message).to.equal("You can't order nothing");
//     });
//   });

//   describe("check if there is free chef and assign to the order", () => {
//     afterEach(() => {
//       const employees: Employees = Employees.getInstance();
//       employees.getAllFreeEmployees().clear();
//       employees.getAllOccupiedEmployees().clear();
//       const tables: Tables = Tables.getInstance();
//       tables.getAllFreeTables().clear();
//       tables.getAllOccupiedTables().clear();
//       const vouchers: Vouchers = Vouchers.getInstance();
//       vouchers.getAllVouchers().clear();
//       const pizzas: Pizzas = Pizzas.getInstance();
//       pizzas.getAllReceipes().clear();
//       const ingredients: Ingredients = Ingredients.getInstance();
//       ingredients.getAllIngredients().clear();
//     });

//     it("Success - there is a free chef", () => {
//       //given
//       const pizzeria: Pizzeria = getPizzeriaObjectWithSettings();

//       const outcome: PizzeriaResponse = pizzeria.makeNewOrder({
//         seatsNo: 4,
//         pizzasOrdered: [PizzaType.Margharita],
//         voucherName: "special",
//       });

//       //when
//       const order: Order = outcome.order as Order;
//       const isFreeChef: PizzeriaResponse = pizzeria.assignChefIfFree(order.id);

//       //then
//       expect(isFreeChef.isSuccess).to.true;
//       expect(isFreeChef.message).to.equal(
//         "There is free chef. Your order will proceed"
//       );
//     });

//     it("Success - there is no a free chef", () => {
//       //given
//       const pizzeria: Pizzeria = getPizzeriaObjectWithSettings();
//       const employees: Employees = Employees.getInstance();
//       employees.removeEmployee(
//         employees.findEmployeeByRole(Role.Chef)?.id as string
//       );

//       const outcome: PizzeriaResponse = pizzeria.makeNewOrder({
//         seatsNo: 4,
//         pizzasOrdered: [PizzaType.Margharita],
//         voucherName: "special",
//       });

//       //when
//       const order: Order = outcome.order as Order;
//       const isFreeChef: PizzeriaResponse = pizzeria.assignChefIfFree(order.id);

//       //then
//       expect(isFreeChef.isSuccess).to.false;
//       expect(isFreeChef.message).to.equal("No free chef for the order");
//     });

//     it("Failure - order not found", () => {
//       //given
//       const pizzeria: Pizzeria = getPizzeriaObjectWithSettings();

//       //when
//       const isFreeChef: PizzeriaResponse = pizzeria.assignChefIfFree("");

//       //then
//       expect(isFreeChef.isSuccess).to.false;
//       expect(isFreeChef.message).to.equal("Order not found!");
//     });
//   });
// });
