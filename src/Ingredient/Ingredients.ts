import { v4 as uuid } from "uuid";
import {
  IIngredient,
  IngredientsBase,
  PropertyName,
  ReceipeIngredient,
} from "./IIngredient";

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

  public getIngredients(ingredients: IngredientsBase[]) {
    return this.listOfIngredients.filter((ingredient) => {
      ingredients.forEach((ingr) => {
        if (ingr === ingredient.name) {
          return ingredient;
        }
      });
    });
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

  public calculateIngredientsCosts(ingredients: ReceipeIngredient[]) {
    let costs = 0;
    ingredients.forEach((ingredient) => {
      let foundIngredient = this.listOfIngredients.find(
        (ingredientFromList) => ingredientFromList.name === ingredient.name
      );
      if (foundIngredient) {
        costs += foundIngredient.price;
      }
    });

    return costs;
  }
}
