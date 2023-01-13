import { v4 as uuid } from "uuid";
import { Pizza } from "../Pizzas/Pizza";
import { Validator } from "../Validator/Validator";
import {
  IngredientDto,
  IngredientsBase,
  ReceipeIngredient,
} from "./Ingredient.types";
import { Ingredient } from "./Ingredient";
import { IIngredients } from "./Ingredients.interface";

export class Ingredients implements IIngredients {
  private listOfIngredients: Map<IngredientsBase, Ingredient> = new Map();

  public findIngredientByName = (
    ingredientName: IngredientsBase
  ): Ingredient | null => this.listOfIngredients.get(ingredientName) ?? null;

  public getAllIngredients = (): Map<IngredientsBase, Ingredient> =>
    this.listOfIngredients;

  public compareIngredientsWithStock = (
    ingredients: IngredientsBase[]
  ): {
    ingredientsFound: Map<IngredientsBase, Ingredient>;
    ingredientsNotFound: IngredientsBase[];
  } => {
    const ingredientsFound: Map<IngredientsBase, Ingredient> = new Map();
    const ingredientsNotFound: IngredientsBase[] = [];

    ingredients.forEach((ingredient) => {
      const foundIngredient: Ingredient | null =
        this.findIngredientByName(ingredient);
      if (foundIngredient) {
        ingredientsFound.set(foundIngredient.name, foundIngredient);
      } else {
        ingredientsNotFound.push(ingredient);
      }
    });
    return { ingredientsFound, ingredientsNotFound };
  };

  public purchaseIngredients = ({
    name,
    price,
    quantity = 1,
  }: IngredientDto): Ingredient | null => {
    Validator.validatePriceIfMoreThenZero(price);
    Validator.validateQuantityIfMoreThenZero(quantity);

    const foundIngredient: Ingredient | null = this.findIngredientByName(name);

    if (foundIngredient) {
      foundIngredient.changeQuantity(quantity);
      return null;
    }

    const newId: string = uuid();
    const newIngredient: Ingredient = new Ingredient(
      newId,
      name,
      quantity,
      price
    );
    this.listOfIngredients.set(newIngredient.name, newIngredient);
    return newIngredient;
  };

  public checkQuantityOfIngredientsForPizza = (pizza: Pizza): boolean => {
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
  };

  public calculateIngredientsCosts = (
    ingredients: ReceipeIngredient[]
  ): number => {
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
  };
}
