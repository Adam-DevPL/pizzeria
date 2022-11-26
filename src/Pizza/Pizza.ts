import { IIngredient, ReceipeIngredient } from "../Ingredient/IIngredient";
import { IPizza } from "./IPizza";

export class Pizza implements IPizza {
  name: string;
  ingredients: ReceipeIngredient[];
  price: number;


  constructor(name: string, ingredients: ReceipeIngredient[]) {
    this.name = name;
    this.ingredients = [...ingredients];
    this.price = 0;
  }

  addMargins(amount: number) {
    this.price += amount;
  }
}
