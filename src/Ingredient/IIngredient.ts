export interface IIngredient {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export type PropertyName = "name" | "quantity" | "price";