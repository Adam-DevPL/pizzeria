import { Employee } from "../Employee/Employee";
import { Ingredients } from "../Ingredient/Ingredients";
import { Table } from "../Table/Table";

export class Pizzeria {
  private static instance: Pizzeria;
  private ingredients: Ingredients;
  private employees: Employee;
  private tables: Table;

  private constructor() {
    this.ingredients = Ingredients.getInstance();
    this.employees = Employee.getInstance();
    this.tables = Table.getInstance();
  };

  public static getInstance(): Pizzeria {
    if (!Pizzeria.instance) {
      Pizzeria.instance = new Pizzeria();
    }
    return Pizzeria.instance;
  }
}