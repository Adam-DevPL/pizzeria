import { IIngredient, ReceipeIngredient } from "../Ingredient/IIngredient";

export interface IPizza {
  name: string;
  ingredients: ReceipeIngredient[];
  price: number;
}
