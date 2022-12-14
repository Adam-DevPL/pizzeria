import { v4 as uuid } from "uuid";
import { ReceipeIngredient } from "../Ingredients/IIngredient";
import { IPizza, PizzaType } from "./IPizza";

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
