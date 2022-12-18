export interface IngredientDto {
  name: IngredientsBase;
  price: number;
  quantity?: number;
}

export interface IIngredient {
  readonly id: string;
  readonly name: IngredientsBase;
  readonly quantity: number;
  readonly price: number;
}

export type ReceipeIngredient = Omit<IIngredient, "price" | "id">;

export type PropertyName = "quantity" | "price";

export enum IngredientsBase {
  potato = "Potato",
  tomato = "Tomato",
  paprika = "Paprika",
  olives = "Olives",
  salad = "Salad",
  ananas = "Ananas",
}
