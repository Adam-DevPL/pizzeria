import { v4 as uuid } from "uuid";

import { Validator } from "../Validator/Validator";
import { PizzaDto, PizzaType } from "./Pizza.types";
import { Pizza } from "./Pizza";
import { IPizzas } from "./Pizzas.interface";

export class Pizzas implements IPizzas {
  private listOfPizzasReceipes: Map<PizzaType, Pizza> = new Map();

  public findPizzaByName = (pizzaName: PizzaType): Pizza | null =>
    this.listOfPizzasReceipes.get(pizzaName) ?? null;

  public getAllReceipes = (): Map<PizzaType, Pizza> =>
    this.listOfPizzasReceipes;

  public addPizzaReceipe = ({ pizzaName, ingredients }: PizzaDto): Pizza => {
    Validator.validateNumberOfIngredients(ingredients.length);

    const findPizzaReceipe: Pizza | null = this.findPizzaByName(pizzaName);

    if (findPizzaReceipe) {
      throw new Error(`Pizza receipe ${PizzaType[pizzaName]} already exists`);
    }

    const newId = uuid();
    const newPizzaReceipe: Pizza = new Pizza(newId, pizzaName, ingredients);
    this.listOfPizzasReceipes.set(newPizzaReceipe.name, newPizzaReceipe);

    return newPizzaReceipe;
  };

  public removePizzaReceipe = (pizzaType: PizzaType): boolean =>
    this.getAllReceipes().delete(pizzaType);

  public getAllPizzasFromOrder = (
    pizzasOrdered: PizzaType[]
  ): Map<PizzaType, Pizza> => {
    let listOfPizzas: Map<PizzaType, Pizza> = new Map<PizzaType, Pizza>();
    let foundPizza: Pizza | null = null;
    pizzasOrdered.forEach((pizzaOrdered) => {
      foundPizza = this.findPizzaByName(pizzaOrdered);
      if (foundPizza) {
        listOfPizzas.set(foundPizza.name, foundPizza);
      }
    });
    return listOfPizzas;
  };
}
