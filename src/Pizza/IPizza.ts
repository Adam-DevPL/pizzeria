import { IIngredient } from "../Ingredient/IIngredient";

export interface IPizza {
  name: string;
  ingredients: IIngredient[];
  price: number;
}