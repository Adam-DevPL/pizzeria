import { IIngredient, IngredientsBase } from "./IIngredient";

export class Ingredient implements IIngredient {
  private _id: string;
  private _name: IngredientsBase;
  private _quantity: number;
  private _price: number;

  constructor(
    id: string,
    name: IngredientsBase,
    quantity: number,
    price: number
  ) {
    this._id = id;
    this._name = name;
    this._quantity = quantity;
    this._price = price;
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
  set name(value: IngredientsBase) {
    this._name = value;
  }
  get quantity() {
    return this._quantity;
  }
  set quantity(value: number) {
    this._quantity = value;
  }
  get price() {
    return this._price;
  }
  set price(value: number) {
    this._price = value;
  }
}
