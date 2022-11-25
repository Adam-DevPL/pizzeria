import { Employee } from "../Employee/Employee";
import { Ingredients } from "../Ingredient/Ingredients";

export class Pizzeria {
  private static instance: Pizzeria;
  private ingredients: Ingredients;
  private employees: Employee;

  private constructor() {
    this.ingredients = Ingredients.getInstance();
    this.employees = Employee.getInstance();
  };

  public static getInstance(): Pizzeria {
    if (!Pizzeria.instance) {
      Pizzeria.instance = new Pizzeria();
    }
    return Pizzeria.instance;
  }
}