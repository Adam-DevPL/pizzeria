import { Ingredients } from "../Ingredient/Ingredients";

export class Pizzeria {
  private static instance: Pizzeria;
  private ingredients: Ingredients;

  private constructor() {
    this.ingredients = Ingredients.getInstance();
  };

  public static getInstance(): Pizzeria {
    if (!Pizzeria.instance) {
      Pizzeria.instance = new Pizzeria();
    }
    return Pizzeria.instance;
  }
}