import { v4 as uuid } from "uuid";
import { IIngredient, PropertyName } from "./IIngredient";

export class Ingredients {
  private static instance: Ingredients;
  private listOfIngredients: IIngredient[] = [];

  private constructor() {}

  public static getInstance(): Ingredients {
    if (!Ingredients.instance) {
      Ingredients.instance = new Ingredients();
    }
    return Ingredients.instance;
  }

  public addNewIngredient(name: string, price: number, quantity: number = 1) {
    this.listOfIngredients.push({
      id: uuid(),
      name: name,
      price: price,
      quantity: quantity,
    });
  }

  public changeProperty(
    id: string,
    name: PropertyName,
    value: string | number
  ) {
    this.listOfIngredients.forEach((ingredient) => {
      if (ingredient.id === id) {
        Object.assign(ingredient, {
          [name]: value,
        });
      }
    });
  }
}
