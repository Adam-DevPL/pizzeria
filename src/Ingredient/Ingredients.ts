import { v4 as uuid } from "uuid";
import { IIngredient, IngredientsBase, PropertyName } from "./IIngredient";

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

  public purchaseIngredients(
    name: IngredientsBase,
    price: number,
    quantity: number = 1
  ): string {
    const foundIngredient = this.listOfIngredients.find(
      (ingredient) => ingredient.name === name
    );
    if (!foundIngredient) {
      this.listOfIngredients.push({
        name: name,
        price: price,
        quantity: quantity,
      });
      return "New ingredient added to the list";
    }
    this.listOfIngredients.forEach((ingredient) => {
      if (ingredient.name === name) {
        ingredient.quantity += quantity;
      }
    });

    return "Ingredients purchased.";
  }
}
