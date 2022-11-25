export interface IIngredient {
  name: IngredientsBase;
  quantity: number;
  price: number;
}

export type PropertyName = "quantity" | "price";

export enum IngredientsBase  {
  potato = "Potato",
  tomato = "Tomato",
  paprika = "Paprika",
  olives = "Olives",
  salad = "Salad",
  ananas = "Ananas",
}