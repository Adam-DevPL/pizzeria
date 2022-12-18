import "mocha";
import { expect } from "chai";
import { Ingredients } from "../src/Ingredient/Ingredients";
import {
  IngredientsBase,
  ReceipeIngredient,
} from "../src/Ingredient/IIngredient";
import { IPizza } from "../src/Pizza/IPizza";

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
        IngredientsBase.paprika,
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

  describe("Purchasing ingredients", () => {
    it("Truthy - add new ingredient", () => {
      const ingredients = Ingredients.getInstance();
      const returnMsg = ingredients.purchaseIngredients(
        IngredientsBase.potato,
        4,
        1
      );
      expect(returnMsg).to.equal("New ingredient added to the list");
    });
    it("Truthy - increase quantity of the existing ingredient", () => {
      const ingredients = Ingredients.getInstance();
      const returnMsg = ingredients.purchaseIngredients(
        IngredientsBase.potato,
        4,
        1
      );
      const potatoQuantity = ingredients.listOfIngredients.find(
        (ingredient) => ingredient.name === IngredientsBase.potato
      )?.quantity;
      expect(returnMsg).to.equal("Ingredients purchased.");
      expect(potatoQuantity).to.equal(2);
    });
    it("Falsy - the price of ingredient is less or equal to zero", () => {
      const ingredients = Ingredients.getInstance();
      expect(function () {
        ingredients.purchaseIngredients(IngredientsBase.potato, -1, 1);
      }).to.throw(Error);
    });
    it("Falsy - the quantity of ingredient is less then zero", () => {
      const ingredients = Ingredients.getInstance();
      expect(function () {
        ingredients.purchaseIngredients(IngredientsBase.potato, 1, -1);
      }).to.throw(Error);
    });
  });

  describe("Calculating costs of ingredients", () => {
    it("Truthy - all ingredients were found and the costs was return", () => {
      const ingredients = Ingredients.getInstance();
      const ingredientsNeedeForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.olives, quantity: 1 },
      ];
      const costOfIngredientsForPizza = ingredients.calculateIngredientsCosts(
        ingredientsNeedeForPizza
      );
      const properCosts = 8;

      expect(costOfIngredientsForPizza).to.equal(properCosts);
    });
    it("Falsy - some ingredients for pizza weren't found, can't calculate the costs, return 0", () => {
      const ingredients = Ingredients.getInstance();
      const ingredientsNeedeForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.tomato, quantity: 1 },
      ];
      const costOfIngredientsForPizza = ingredients.calculateIngredientsCosts(
        ingredientsNeedeForPizza
      );
      const properCosts = 0;

      expect(costOfIngredientsForPizza).to.equal(properCosts);
    });
  });
  describe("Comapring ingredients quantities between receipe and storeage", () => {
    it("Truthy - should return true if we can make the pizza", () => {
      const ingredients = Ingredients.getInstance();
      console.log(ingredients);
      const pizza: IPizza = {name: "Pizza", ingredients: [{name: IngredientsBase.ananas, quantity: 3}]}
      const returnMsg = ingredients.checkQuantityOfIngredientsForPizza(pizza);
      expect(returnMsg).to.equal(true);
    });
  });
});
