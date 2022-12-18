import { expect } from "chai";
import { Employee } from "../../Employees/Employee";
import { Employees } from "../../Employees/Employees";
import { EmployeeDto, Role } from "../../Employees/IEmployee";
import {
  IngredientDto,
  IngredientsBase,
  ReceipeIngredient,
} from "../../Ingredients/IIngredient";
import { Ingredients } from "../../Ingredients/Ingredients";
import { PizzaDto, PizzaType } from "../../Pizzas/IPizza";
import { Pizzas } from "../../Pizzas/Pizzas";
import { TableDto } from "../../Table/ITable";
import { Tables } from "../../Table/Tables";
import { VoucherDto } from "../../Voucher/IVoucher";
import { Vouchers } from "../../Voucher/Vouchers";
import { PizzeriaResponse } from "../IPizzeria";
import { Pizzeria } from "../Pizzeria";

describe("Pizzeria module", () => {
  describe("hire new employee", () => {
    beforeEach(() => {
      const employees: Employees = Employees.getInstance();
      employees.getAllFreeEmployees().clear();
      employees.getAllOccupiedEmployees().clear();
    });

    it("Success - hire new employee - Employee created successfully", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const employeeDto: EmployeeDto = { name: "Adam", role: Role.chef };

      //when
      const newEmployeeResponse: PizzeriaResponse =
        pizzeria.hireNewEmployee(employeeDto);

      //then
      expect(newEmployeeResponse.isSuccess).to.true;
      expect(newEmployeeResponse.message).to.equal(
        "Employee created successfully"
      );
    });

    it("Failure - hire new employee - Employee exists in database", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const employeeDto: EmployeeDto = { name: "Adam", role: Role.chef };

      //when
      pizzeria.hireNewEmployee(employeeDto);
      const duplicatedEmployeeResp: PizzeriaResponse =
        pizzeria.hireNewEmployee(employeeDto);

      //then
      expect(duplicatedEmployeeResp.isSuccess).to.false;
      expect(duplicatedEmployeeResp.message).to.equal(
        "Employee exists in database"
      );
    });

    it("Failure - hire new employee - It's not valid name or it's empty", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const employeeDto: EmployeeDto = { name: "", role: Role.chef };

      //when
      const errorResp: PizzeriaResponse = pizzeria.hireNewEmployee(employeeDto);

      //then
      expect(errorResp.isSuccess).to.false;
      expect(errorResp.message).to.equal("It's not valid name or it's empty");
    });
  });
  describe("purchase new table", () => {
    beforeEach(() => {
      const tables: Tables = Tables.getInstance();
      tables.getAllFreeTables().clear();
      tables.getAllOccupiedTables().clear();
    });

    it("Success - purchase new table - Table purchesed successfully", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const tabeDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };

      //when
      const newTableResponse: PizzeriaResponse =
        pizzeria.purchaseNewTable(tabeDto);

      //then
      expect(newTableResponse.isSuccess).to.true;
      expect(newTableResponse.message).to.equal("Table purchesed successfully");
    });

    it("Failure - purchase new table - Table exists in database", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const tabeDto: TableDto = { tableNumber: 1, numberOfSeats: 4 };

      //when
      pizzeria.purchaseNewTable(tabeDto);
      const newTableResponse: PizzeriaResponse =
        pizzeria.purchaseNewTable(tabeDto);

      //then
      expect(newTableResponse.isSuccess).to.false;
      expect(newTableResponse.message).to.equal("Table exists in database");
    });

    it("Failure - purchase new table - The table number must be greater than zero!", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const tabeDto: TableDto = { tableNumber: 0, numberOfSeats: 4 };

      //when
      const newTableResponse: PizzeriaResponse =
        pizzeria.purchaseNewTable(tabeDto);

      //then
      expect(newTableResponse.isSuccess).to.false;
      expect(newTableResponse.message).to.equal(
        "The number must be greater than zero!"
      );
    });

    it("Failure - purchase new table - The number of seats must be greater than zero!", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const tabeDto: TableDto = { tableNumber: 1, numberOfSeats: 0 };

      //when
      const newTableResponse: PizzeriaResponse =
        pizzeria.purchaseNewTable(tabeDto);

      //then
      expect(newTableResponse.isSuccess).to.false;
      expect(newTableResponse.message).to.equal(
        "The number must be greater than zero!"
      );
    });
  });

  describe("adding new voucher", () => {
    beforeEach(() => {
      const vouchers: Vouchers = Vouchers.getInstance();
      vouchers.getAllVouchers().clear();
    });

    it("Success - added new voucher to db - New voucher was added", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const voucherDto: VoucherDto = {
        name: "special",
        discount: 10,
        weekDay: null,
      };

      //when
      const newVoucherResp: PizzeriaResponse =
        pizzeria.addNewVoucher(voucherDto);

      //then
      expect(newVoucherResp.isSuccess).to.true;
      expect(newVoucherResp.message).to.equal("New voucher was added");
    });

    it("Failure - adding new voucher witch exit in db - Voucher exists in database", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const voucherDto: VoucherDto = {
        name: "special",
        discount: 10,
        weekDay: null,
      };

      //when
      pizzeria.addNewVoucher(voucherDto);
      const newVoucherResp: PizzeriaResponse =
        pizzeria.addNewVoucher(voucherDto);

      //then
      expect(newVoucherResp.isSuccess).to.false;
      expect(newVoucherResp.message).to.equal("Voucher exists in database");
    });

    it("Failure - adding new voucher with empty name - The name can't be empty", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const voucherDto: VoucherDto = { name: "", discount: 10, weekDay: null };

      //when
      const newVoucherResp: PizzeriaResponse =
        pizzeria.addNewVoucher(voucherDto);

      //then
      expect(newVoucherResp.isSuccess).to.false;
      expect(newVoucherResp.message).to.equal("The name can't be empty");
    });

    it("Failure - adding new voucher with discount below 0 - Discount can't be less then zero or greater then 100", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const voucherDto: VoucherDto = {
        name: "special",
        discount: -1,
        weekDay: null,
      };

      //when
      const newVoucherResp: PizzeriaResponse =
        pizzeria.addNewVoucher(voucherDto);

      //then
      expect(newVoucherResp.isSuccess).to.false;
      expect(newVoucherResp.message).to.equal(
        "Discount can't be less then zero or greater then 100"
      );
    });
  });

  describe("adding new pizza receipe", () => {
    beforeEach(() => {
      const pizzas: Pizzas = Pizzas.getInstance();
      pizzas.getAllReceipes().clear();
    });

    it("Success - adding new pizza receipe - New receipe added to menu", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const margharita: PizzaType = PizzaType.margharita;
      const ingredientsForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.olives, quantity: 4 },
        { name: IngredientsBase.tomato, quantity: 2 },
      ];
      const pizzaDto: PizzaDto = {
        pizzaName: margharita,
        ingredients: ingredientsForPizza,
      };

      //when
      const newPizzaResp: PizzeriaResponse = pizzeria.createPizza(pizzaDto);

      //then
      expect(newPizzaResp.isSuccess).to.true;
      expect(newPizzaResp.message).to.equal("New receipe added to menu");
    });

    it("Failure - adding new receipe when it already exists - This receipe exist already in database", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const margharita: PizzaType = PizzaType.margharita;
      const ingredientsForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.olives, quantity: 4 },
        { name: IngredientsBase.tomato, quantity: 2 },
      ];
      const pizzaDto: PizzaDto = {
        pizzaName: margharita,
        ingredients: ingredientsForPizza,
      };

      //when
      pizzeria.createPizza(pizzaDto);
      const newPizzaResp: PizzeriaResponse = pizzeria.createPizza(pizzaDto);

      //then
      expect(newPizzaResp.isSuccess).to.false;
      expect(newPizzaResp.message).to.equal(
        "This receipe exist already in database"
      );
    });

    it("Failure - adding new receipe with empty ingredients - Not enaught ingredients to create pizza receipe", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const margharita: PizzaType = PizzaType.margharita;
      const ingredientsForPizza: ReceipeIngredient[] = [];
      const pizzaDto: PizzaDto = {
        pizzaName: margharita,
        ingredients: ingredientsForPizza,
      };

      //when
      const newPizzaResp: PizzeriaResponse = pizzeria.createPizza(pizzaDto);

      //then
      expect(newPizzaResp.isSuccess).to.false;
      expect(newPizzaResp.message).to.equal(
        "Not enaught ingredients to create pizza receipe"
      );
    });
  });

  describe("purchasing new ingredient", () => {
    beforeEach(() => {
      const ingredients: Ingredients = Ingredients.getInstance();
      ingredients.getAllIngredients().clear();
    });

    it("Success - purchasing new ingredient - New ingredient added to the stock", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const ingredientOlivesDto: IngredientDto = {
        name: IngredientsBase.olives,
        price: 4,
        quantity: 1,
      };

      //when
      const newIngredientResp: PizzeriaResponse =
        pizzeria.purchaseIngredients(ingredientOlivesDto);

      //then
      expect(newIngredientResp.isSuccess).to.true;
      expect(newIngredientResp.message).to.equal(
        "New ingredient added to the stock"
      );
    });

    it("Success - purchasing ingredient that already exists - Ingredient added to stock", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const ingredientOlivesDto: IngredientDto = {
        name: IngredientsBase.olives,
        price: 4,
        quantity: 1,
      };

      //when
      pizzeria.purchaseIngredients(ingredientOlivesDto);
      const newIngredientResp: PizzeriaResponse =
        pizzeria.purchaseIngredients(ingredientOlivesDto);

      //then
      expect(newIngredientResp.isSuccess).to.true;
      expect(newIngredientResp.message).to.equal(
        "Ingredient added to stock"
      );
    });

    it("Failure - adding new ingredient with 0 price - The price must be more tehn zero", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const ingredientOlivesDto: IngredientDto = {
        name: IngredientsBase.olives,
        price: 0,
        quantity: 1,
      };

      //when
      const newIngredientResp: PizzeriaResponse =
        pizzeria.purchaseIngredients(ingredientOlivesDto);

      //then
      expect(newIngredientResp.isSuccess).to.false;
      expect(newIngredientResp.message).to.equal(
        "The price must be more tehn zero"
      );
    });

    it("Failure - adding new ingredient with -1 quantity - The quantity is less then zero!", () => {
      //given
      const pizzeria: Pizzeria = new Pizzeria();
      const ingredientOlivesDto: IngredientDto = {
        name: IngredientsBase.olives,
        price: 1,
        quantity: -1,
      };

      //when
      const newIngredientResp: PizzeriaResponse =
        pizzeria.purchaseIngredients(ingredientOlivesDto);

      //then
      expect(newIngredientResp.isSuccess).to.false;
      expect(newIngredientResp.message).to.equal(
        "The quantity is less then zero!"
      );
    });
  });
});
