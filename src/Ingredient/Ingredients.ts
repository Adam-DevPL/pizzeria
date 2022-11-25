import { v4 as uuid } from "uuid";
import { IIngredient, PropertyName } from "./IIngredient";

export class Ingredients {
  private static instance: Ingredients;
  private listOfIngredients: IIngredient[] = [];

  private constructor() {}

  public static getInstance(): Ingredients {
    if (!Ingredients.instance) {
      Ingredients.instance = new Ingredients();
    }
    return Ingredients.instance;
  }

  public addNewIngredient(
    name: string,
    price: number,
    quantity: number = 1
  ): string {
    const foundIngredient = this.listOfIngredients.find(
      (ingredient) => ingredient.name === name
    );
    if (foundIngredient) {
      return "Duplicated ingredient";
    }
    this.listOfIngredients.push({
      name: name,
      price: price,
      quantity: quantity,
    });
    return "Ingredient added to the list";
  }

  public changeProperty(
    ingredientName: string,
    propertyName: PropertyName,
    value: number
  ) {
    this.listOfIngredients.forEach((ingredient) => {
      if (ingredient.name === ingredientName) {
        Object.assign(ingredient, {
          [propertyName]: value,
        });
      }
    });
  }

  public removeIngredient(name: string) {
    this.listOfIngredients = this.listOfIngredients.filter(
      (ingredient) => ingredient.name !== name
    );
  }
}
