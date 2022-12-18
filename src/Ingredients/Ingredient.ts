import { IIngredient, IngredientsBase } from "./IIngredient";

export class Ingredient implements IIngredient {
  readonly id: string;
  readonly name: IngredientsBase;
  readonly quantity: number;
  readonly price: number;

  constructor(
    id: string,
    name: IngredientsBase,
    quantity: number,
    price: number
  ) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

  changeQuantity(quantity: number) {
    (this.quantity as Ingredient["quantity"]) += quantity;
  }
}
