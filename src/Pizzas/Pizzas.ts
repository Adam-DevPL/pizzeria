import {v4 as uuid} from "uuid";

import { IIngredient, ReceipeIngredient } from "../Ingredients/IIngredient";
import { Validator } from "../Validator/Validator";
import { IPizza, PizzaType } from "./IPizza";
import { Pizza } from "./Pizza";

export class Pizzas {
  private static instance: Pizzas;
  private listOfPizzasReceipes: Map<string, Pizza> = new Map();

  private constructor() {}

  public static getInstance(): Pizzas {
    if (!Pizzas.instance) {
      Pizzas.instance = new Pizzas();
    }
    return Pizzas.instance;
  }

  private findPizzaByName(pizzaName: PizzaType): Pizza | null {
    let foundPizza: Pizza | null = null;
    this.listOfPizzasReceipes.forEach((pizza) => {
      if (pizza.name === pizzaName) {
        foundPizza = pizza;
        return;
      }
    });
    return foundPizza;
  }

  public getReceipe(pizzaId: string): Pizza | null {
    return this.listOfPizzasReceipes.get(pizzaId) ?? null;
  }

  public getAllReceipes(): Map<string, Pizza> {
    return this.listOfPizzasReceipes;
  }

  public getAllPizzasFromOrder(pizzasOrdered: PizzaType[]): Map<string, Pizza> {
    let listOfPizzas: Map<string, Pizza> = new Map();
    let foundPizza: Pizza | null = null;
    pizzasOrdered.forEach(pizzaOrdered => {
      foundPizza = this.findPizzaByName(pizzaOrdered);
      if (foundPizza) {
        listOfPizzas.set(foundPizza.id, foundPizza);
      }
    })
    return listOfPizzas;
  }

  public addPizzaReceipe(pizzaName: PizzaType, ingredients: ReceipeIngredient[]) {
    const findPizzaReceipe = this.findPizzaByName(pizzaName);

    if (findPizzaReceipe) {
      return null;
    }

    const newId = uuid();
    const newPizzaReceipe: Pizza = new Pizza(newId, pizzaName, ingredients);
    this.listOfPizzasReceipes.set(newId, newPizzaReceipe);

    return newPizzaReceipe;
  }
}
