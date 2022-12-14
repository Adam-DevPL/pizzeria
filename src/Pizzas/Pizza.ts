import { ReceipeIngredient } from "../Ingredients/Ingredient.types";
import { IPizza, PizzaType } from "./Pizza.types";

export class Pizza implements IPizza {
  readonly id: string;
  readonly name: PizzaType;
  readonly ingredients: ReceipeIngredient[];

  constructor(id: string, name: PizzaType, ingredients: ReceipeIngredient[]) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
  }
}
