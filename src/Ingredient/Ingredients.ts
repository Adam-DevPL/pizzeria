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
    const ingredientsNotFound: IngredientsBase[] = [];
    const ingredientsFound = this.listOfIngredients.filter((ingredient) => {
      return ingredients.find((ingr) => {
        if (ingr === ingredient.name) {
          return 1;
        } else {
          ingredientsNotFound.push(ingr);
          return 0;
        }
      });
    });

    return { ingredientsFound, ingredientsNotFound };
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
      if (!foundIngredient) {
        throw new Error("Ingredient does not found");
      }
      costs += foundIngredient.price * ingredient.quantity;
    });

    return costs;
  }
}
