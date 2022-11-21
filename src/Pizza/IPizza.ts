import { IIngredient } from "../Ingredient/IIngredient";

export interface IPizza {
  ingredients: IIngredient[];
  price: number;
}