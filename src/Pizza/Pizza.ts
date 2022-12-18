import { IIngredient, ReceipeIngredient } from "../Ingredient/IIngredient";
import { Validator } from "../Validator/Validator";
import { IPizza } from "./IPizza";

export class Pizzas {
  private static instance: Pizzas;
  listOfPizzasReceipes: IPizza[] = [];

  private constructor() {}

  public static getInstance(): Pizzas {
    if (!Pizzas.instance) {
      Pizzas.instance = new Pizzas();
    }
    return Pizzas.instance;
  }

  public findPizza(pizzaName: string) {
    return this.listOfPizzasReceipes.find((p) => p.name === pizzaName) ?? null;
  }

  public addPizzaReceipe(pizzaName: string, ingredients: ReceipeIngredient[]) {
    Validator.validateName(pizzaName);

    const findPizzaReceipe = this.findPizza(pizzaName);

    if (findPizzaReceipe) {
      return `Receipe for ${pizzaName} exist in database`;
    }

    this.listOfPizzasReceipes.push({ name: pizzaName, ingredients: [...ingredients] });

    return `New receipe for ${pizzaName} added to the database`;
  }

  public canWeMakeIt(pizzas: IPizza[], ingredients: ReceipeIngredient[]) { 
    
  }
}
