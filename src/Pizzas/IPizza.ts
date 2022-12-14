import { IIngredient, ReceipeIngredient } from "../Ingredients/IIngredient";

export interface IPizza {
  readonly id: string;
  readonly name: PizzaType;
  readonly ingredients: ReceipeIngredient[];
}

export enum PizzaType {
  margharita = "Margharita",
  hawaian = "Hawaian",
}
