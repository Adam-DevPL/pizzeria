import { IIngredient } from "../Ingredient/IIngredient";
import { Ingredients } from "../Ingredient/Ingredients";
import { IPizza } from "./IPizza";

export class Pizza implements IPizza {
  name: string;
  ingredients: IIngredient[];
  price: number;

  constructor(name: string) {
    this.name = name;
    this.ingredients = [];
    this.price = 0;
  }

  addIngredientToPizza(ingredients: IIngredient[]) {
    this.ingredients.push(...ingredients);
    this.price = this.ingredients.reduce(
      (total, ingredient) => total + ingredient.price,
      0
    );
  }

  removeIngredientFromPizza(ingredient: IIngredient) {
    this.ingredients = this.ingredients.filter(
      (ingredientFromList) => ingredientFromList.name !== ingredient.name
    );
    this.price = this.ingredients.reduce(
      (total, ingredient) => total + ingredient.price,
      0
    );
  }
}
