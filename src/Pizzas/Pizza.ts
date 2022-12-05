import { v4 as uuid } from "uuid";
import { ReceipeIngredient } from "../Ingredients/IIngredient";
import { IPizza, PizzaType } from "./IPizza";

export class Pizza implements IPizza {
  private _id: string;
  private _name: PizzaType;
  private _ingredients: ReceipeIngredient[];

  constructor(id: string, name: PizzaType, ingredients: ReceipeIngredient[]) {
    this._id = id;
    this._name = name;
    this._ingredients = ingredients;
  }

  get id() {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get name() {
    return this._name;
  }
  set name(value: PizzaType) {
    this._name = value;
  }
  get ingredients() {
    return this._ingredients;
  }
  set ingredients(value: ReceipeIngredient[]) {
    this._ingredients = [...value];
  }
}
