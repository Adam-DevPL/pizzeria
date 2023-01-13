import { Pizza } from "../Pizzas/Pizza";
import { Ingredient } from "./Ingredient";
import {
  IngredientDto,
  IngredientsBase,
  ReceipeIngredient,
} from "./Ingredient.types";

export interface IIngredients {
  findIngredientByName: (ingredientName: IngredientsBase) => Ingredient | null;
  getAllIngredients: () => Map<IngredientsBase, Ingredient>;
  compareIngredientsWithStock: (ingredients: IngredientsBase[]) => {
    ingredientsFound: Map<IngredientsBase, Ingredient>;
    ingredientsNotFound: IngredientsBase[];
  };
  purchaseIngredients: (ingredientDto: IngredientDto) => Ingredient | null;
  checkQuantityOfIngredientsForPizza: (pizza: Pizza) => boolean;
  calculateIngredientsCosts: (ingredients: ReceipeIngredient[]) => number;
}
