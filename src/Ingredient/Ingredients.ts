import { v4 as uuid } from "uuid";
import { IPizza } from "../Pizza/IPizza";
import { Validator } from "../Validator/Validator";
import {
  IIngredient,
  IngredientsBase,
  PropertyName,
  ReceipeIngredient,
} from "./IIngredient";

export class Ingredients {
  private static instance: Ingredients;
  listOfIngredients: IIngredient[] = [];

  private constructor() {}

  public static getInstance(): Ingredients {
    if (!Ingredients.instance) {
      Ingredients.instance = new Ingredients();
    }
    return Ingredients.instance;
  }

  public getIngredients(ingredients: IngredientsBase[]) {
    const ingredientsFound = this.listOfIngredients.filter((ingredient) => {
      return ingredients.find((ingr) => ingr === ingredient.name);
    });
    const ingredientsNotFound: IngredientsBase[] = ingredients.filter(
      (ingredient) => {
        const foundIngredient = ingredientsFound.find(
          (ingr) => ingr.name === ingredient
        );
        if (foundIngredient) {
          return 0;
        }
        return 1;
      }
    );
    return { ingredientsFound, ingredientsNotFound };
  }

  public purchaseIngredients(
    name: IngredientsBase,
    price: number,
    quantity: number = 1
  ): string {
    Validator.validatePriceIfMoreThenZero(price);
    Validator.validateQuantityIfMoreThenZero(quantity);

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

  public checkQuantityOfIngredientsForPizza(pizza: IPizza) {
    let isOk = true;
    const listOfIngredients = pizza.ingredients.map(
      (ingredient) => ingredient.name
    );
    const foundIngredients =
      this.getIngredients(listOfIngredients);

    if (foundIngredients.ingredientsNotFound.length !== 0) {
      return false;
    }

    pizza.ingredients.forEach((ingredient) => {
      const ingr = foundIngredients.ingredientsFound.find(i => i.name === ingredient.name);
      if (ingr && ingr.quantity - ingredient.quantity < 0) {
        isOk = false;
      }
    })

    return isOk;
  }

  public calculateIngredientsCosts(ingredients: ReceipeIngredient[]) {
    const ingredientsBase = ingredients.map((ingredient) => ingredient.name);
    const foundIngredientsInStorage = this.getIngredients(ingredientsBase);

    if (foundIngredientsInStorage.ingredientsNotFound.length !== 0) {
      return 0;
    }

    return foundIngredientsInStorage.ingredientsFound.reduce(
      (total, ingredient) => {
        const ingredientQuantity =
          ingredients.find((ingr) => ingr.name === ingredient.name)?.quantity ??
          0;
        return total + ingredient.price * ingredientQuantity;
      },
      0
    );
  }
}
