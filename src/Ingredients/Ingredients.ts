import { v4 as uuid } from "uuid";
import { IPizza } from "../Pizzas/IPizza";
import { Pizza } from "../Pizzas/Pizza";
import { Validator } from "../Validator/Validator";
import {
  IIngredient,
  IngredientsBase,
  PropertyName,
  ReceipeIngredient,
} from "./IIngredient";
import { Ingredient } from "./Ingredient";

export class Ingredients {
  private static instance: Ingredients;
  private listOfIngredients: Map<string, Ingredient> = new Map();

  private constructor() {}

  public static getInstance(): Ingredients {
    if (!Ingredients.instance) {
      Ingredients.instance = new Ingredients();
    }
    return Ingredients.instance;
  }

  public findIngredientByName(
    ingredientName: IngredientsBase
  ): Ingredient | null {
    let foundIngredient: Ingredient | null = null;
    this.listOfIngredients.forEach((ingredient) => {
      if (ingredient.name === ingredientName) {
        foundIngredient = ingredient;
        return;
      }
    });
    return foundIngredient;
  }

  public getAllIngredients(): Map<string, Ingredient> {
    return this.listOfIngredients;
  }

  public compareIngredientsWithStock(ingredients: IngredientsBase[]): {
    ingredientsFound: Map<string, Ingredient>;
    ingredientsNotFound: IngredientsBase[];
  } {
    const ingredientsFound: Map<string, Ingredient> = new Map();
    const ingredientsNotFound: IngredientsBase[] = [];

    ingredients.forEach((ingredient) => {
      const foundIngredient: Ingredient | null =
        this.findIngredientByName(ingredient);
      if (foundIngredient) {
        ingredientsFound.set(foundIngredient.id, foundIngredient);
      } else {
        ingredientsNotFound.push(ingredient);
      }
    });
    return { ingredientsFound, ingredientsNotFound };
  }

  public purchaseIngredients(
    name: IngredientsBase,
    price: number,
    quantity: number = 1
  ): Ingredient | null {
    Validator.validatePriceIfMoreThenZero(price);
    Validator.validateQuantityIfMoreThenZero(quantity);

    const foundIngredient: Ingredient | null = this.findIngredientByName(name);

    if (!foundIngredient) {
      const newId: string = uuid();
      const newIngredient: Ingredient = new Ingredient(
        newId,
        name,
        quantity,
        price
      );
      this.listOfIngredients.set(newId, newIngredient);
      return newIngredient;
    }
    this.listOfIngredients.forEach((ingredient) => {
      if (ingredient.name === name) {
        ingredient.quantity += quantity;
      }
    });

    return null;
  }

  public checkQuantityOfIngredientsForPizza(pizza: Pizza): boolean {
    let isOk = true;
    let listOfIngredients: IngredientsBase[] = pizza.ingredients.map(
      (ingredient) => ingredient.name
    );
    const foundIngredients =
      this.compareIngredientsWithStock(listOfIngredients);

    if (foundIngredients.ingredientsNotFound.length !== 0) {
      return false;
    }

    pizza.ingredients.forEach((ingredient) => {
      const ingr = this.findIngredientByName(ingredient.name);
      if (ingr && ingr.quantity - ingredient.quantity < 0) {
        isOk = false;
      }
    });

    return isOk;
  }

  public calculateIngredientsCosts(ingredients: ReceipeIngredient[]) {
    const ingredientsBase = ingredients.map((ingredient) => ingredient.name);
    const foundIngredientsInStorage =
      this.compareIngredientsWithStock(ingredientsBase);

    if (foundIngredientsInStorage.ingredientsNotFound.length !== 0) {
      return 0;
    }

    return ingredients.reduce(
      (total, value) =>
        total +
        value.quantity *
          (this.findIngredientByName(value.name) as Ingredient).price,
      0
    );
  }
}
