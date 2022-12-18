import { IIngredient, ReceipeIngredient } from "../Ingredients/IIngredient";

export interface IPizza {
  id: string;
  name: PizzaType;
  ingredients: ReceipeIngredient[];
}

export enum PizzaType {
  margharita = "Margharita",
  hawaian = "Hawaian",
}
