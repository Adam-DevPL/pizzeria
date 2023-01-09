import { ReceipeIngredient } from "../Ingredients/Ingredient.types";

export interface IPizza {
  readonly id: string;
  readonly name: PizzaType;
  readonly ingredients: ReceipeIngredient[];
}

export interface PizzaDto {
  pizzaName: PizzaType;
  ingredients: ReceipeIngredient[];
}

export enum PizzaType {
  Margharita,
  Hawaian,
}
