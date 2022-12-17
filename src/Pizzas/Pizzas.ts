import { v4 as uuid } from "uuid";

import { ReceipeIngredient } from "../Ingredients/IIngredient";
import { Validator } from "../Validator/Validator";
import { PizzaType } from "./IPizza";
import { Pizza } from "./Pizza";

export class Pizzas {
  private static instance: Pizzas;
  private listOfPizzasReceipes: Map<PizzaType, Pizza> = new Map();

  private constructor() {}

  public static getInstance(): Pizzas {
    if (!Pizzas.instance) {
      Pizzas.instance = new Pizzas();
    }
    return Pizzas.instance;
  }

  public findPizzaByName(pizzaName: PizzaType): Pizza | null {
    return this.listOfPizzasReceipes.get(pizzaName) ?? null;
  }

  public getAllReceipes(): Map<PizzaType, Pizza> {
    return this.listOfPizzasReceipes;
  }

  public addPizzaReceipe(
    pizzaName: PizzaType,
    ingredients: ReceipeIngredient[]
  ): Pizza | null {
    Validator.validateNumberOfIngredients(ingredients.length);

    const findPizzaReceipe: Pizza | null = this.findPizzaByName(pizzaName);

    if (findPizzaReceipe) {
      return null;
    }

    const newId = uuid();
    const newPizzaReceipe: Pizza = new Pizza(newId, pizzaName, ingredients);
    this.listOfPizzasReceipes.set(newPizzaReceipe.name, newPizzaReceipe);

    return newPizzaReceipe;
  }

  public getAllPizzasFromOrder(
    pizzasOrdered: PizzaType[]
  ): Map<PizzaType, Pizza> {
    let listOfPizzas: Map<PizzaType, Pizza> = new Map<PizzaType, Pizza>();
    let foundPizza: Pizza | null = null;
    pizzasOrdered.forEach((pizzaOrdered) => {
      foundPizza = this.findPizzaByName(pizzaOrdered);
      if (foundPizza) {
        listOfPizzas.set(foundPizza.name, foundPizza);
      }
    });
    return listOfPizzas;
  }
}
