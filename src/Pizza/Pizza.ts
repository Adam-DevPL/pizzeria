import { IIngredient } from "../Ingredient/IIngredient";
import { IPizza } from "./IPizza";

export class Pizza implements IPizza {
  name: string;
  ingredients: IIngredient[];
  price: number;

  constructor(name: string, ingredients: IIngredient[]) {
    this.name = name;
    this.ingredients = [...ingredients];
    this.price = this.ingredients.reduce(
      (total, ingredient) => total + ingredient.price,
      0
    );
  }

  addMargins(amount: number) {
    this.price += amount;
  }
}
