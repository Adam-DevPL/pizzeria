import "mocha";
import { expect } from "chai";
import { Ingredients } from "../src/Ingredient/Ingredients";
import { IngredientsBase } from "../src/Ingredient/IIngredient";

describe("Ingredients", () => {
  describe("Get ingredients with price from the storage", () => {
    it("Truthy - you get all ingredients form the storage of Pizzeria", () => {
      const ingredients = Ingredients.getInstance();
      ingredients.purchaseIngredients(IngredientsBase.olives, 4, 1);
      ingredients.purchaseIngredients(IngredientsBase.ananas, 4, 1);

      const ingredientsWeWant: IngredientsBase[] = [
        IngredientsBase.olives,
        IngredientsBase.ananas,
      ];

      const ingredientsWeGet = ingredients.getIngredients(ingredientsWeWant);

      const ananas = ingredientsWeGet.ingredientsFound.find(
        (ingredient) => ingredient.name === IngredientsBase.ananas
      );
      const olives = ingredientsWeGet.ingredientsFound.find(
        (ingredient) => ingredient.name === IngredientsBase.olives
      );

      expect(ananas).to.not.equal(undefined);
      expect(olives).to.not.equal(undefined);
    });
    it("Falsy - you get some of the ingredients form the storage", () => {
      const ingredients = Ingredients.getInstance();
      ingredients.purchaseIngredients(IngredientsBase.olives, 4, 1);
      ingredients.purchaseIngredients(IngredientsBase.ananas, 4, 1);

      const ingredientsWeWant: IngredientsBase[] = [
        IngredientsBase.olives,
        IngredientsBase.ananas,
        IngredientsBase.paprika
      ];

      const ingredientsWeGet = ingredients.getIngredients(ingredientsWeWant);

      const ananas = ingredientsWeGet.ingredientsFound.find(
        (ingredient) => ingredient.name === IngredientsBase.ananas
      );
      const olives = ingredientsWeGet.ingredientsFound.find(
        (ingredient) => ingredient.name === IngredientsBase.olives
      );
      const paprika = ingredientsWeGet.ingredientsFound.find(
        (ingredient) => ingredient.name === IngredientsBase.paprika
      );

      expect(ananas).to.not.equal(undefined);
      expect(olives).to.not.equal(undefined);
      expect(paprika).to.equal(undefined);
    });
    it("Falsy - you get none of the ingredients", () => {
      const ingredients = Ingredients.getInstance();
      ingredients.purchaseIngredients(IngredientsBase.olives, 4, 1);
      ingredients.purchaseIngredients(IngredientsBase.ananas, 4, 1);

      const ingredientsWeWant: IngredientsBase[] = [
        IngredientsBase.salad,
        IngredientsBase.potato,
      ];

      const ingredientsWeGet = ingredients.getIngredients(ingredientsWeWant);

      const salad = ingredientsWeGet.ingredientsFound.find(
        (ingredient) => ingredient.name === IngredientsBase.salad
      );
      const potato = ingredientsWeGet.ingredientsFound.find(
        (ingredient) => ingredient.name === IngredientsBase.potato
      );

      expect(salad).to.equal(undefined);
      expect(potato).to.equal(undefined);
    });
  });
});
