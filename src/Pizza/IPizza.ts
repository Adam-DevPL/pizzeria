import { IIngredient, ReceipeIngredient } from "../Ingredients/IIngredient";

export interface IPizza {
  name: string;
  ingredients: ReceipeIngredient[];
}
