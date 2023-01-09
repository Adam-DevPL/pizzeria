import "mocha";
import { expect } from "chai";

import { Ingredient } from "../Ingredient";
import { Ingredients } from "../Ingredient.service";
import {
  IngredientDto,
  IngredientsBase,
  ReceipeIngredient,
} from "../Ingredient.types";

function lookForIngredient(
  array: Map<IngredientsBase, Ingredient>,
  ingredientBase: IngredientsBase
): Ingredient | null {
  return (
    [...array]
      .map((value) => value[1])
      .find((ingr) => ingr.name === ingredientBase) ?? null
  );
}

describe("Ingredients", () => {
  describe("Get ingredients with price from the storage", () => {
    beforeEach(() => {
      const ingredients = Ingredients.getInstance();
      let ingredientOlivesDto: IngredientDto = {
        name: IngredientsBase.Olives,
        price: 4,
        quantity: 1,
      };
      let ingredientAnanasDto: IngredientDto = {
        name: IngredientsBase.Ananas,
        price: 4,
        quantity: 1,
      };
      ingredients.purchaseIngredients(ingredientOlivesDto);
      ingredients.purchaseIngredients(ingredientAnanasDto);
    });

    afterEach(() => {
      const ingredients = Ingredients.getInstance();
      ingredients.getAllIngredients().clear();
    });

    it("Truthy - you get all ingredients from the storage of Pizzeria", () => {
      //given
      const ingredients: Ingredients = Ingredients.getInstance();

      //when
      const ingredientsWeWant: IngredientsBase[] = [
        IngredientsBase.Olives,
        IngredientsBase.Ananas,
      ];
      const ingredientsWeGet: Map<IngredientsBase, Ingredient> =
        ingredients.compareIngredientsWithStock(
          ingredientsWeWant
        ).ingredientsFound;

      const foundAnanas: Ingredient | null = lookForIngredient(
        ingredientsWeGet,
        IngredientsBase.Ananas
      );
      const foundOlives: Ingredient | null = lookForIngredient(
        ingredientsWeGet,
        IngredientsBase.Olives
      );

      //then
      expect(foundAnanas?.name).to.equal(IngredientsBase.Ananas);
      expect(foundOlives?.name).to.equal(IngredientsBase.Olives);
    });

    it("Falsy - you get some of the ingredients form the storage", () => {
      //given
      const ingredients = Ingredients.getInstance();

      //when
      const ingredientsWeWant: IngredientsBase[] = [
        IngredientsBase.Olives,
        IngredientsBase.Ananas,
        IngredientsBase.Paprika,
      ];

      const ingredientsWeGet: Map<IngredientsBase, Ingredient> =
        ingredients.compareIngredientsWithStock(
          ingredientsWeWant
        ).ingredientsFound;

      const foundAnanas: Ingredient | null = lookForIngredient(
        ingredientsWeGet,
        IngredientsBase.Ananas
      );
      const foundOlives: Ingredient | null = lookForIngredient(
        ingredientsWeGet,
        IngredientsBase.Olives
      );
      const foundPaprika: Ingredient | null = lookForIngredient(
        ingredientsWeGet,
        IngredientsBase.Paprika
      );

      //then
      expect(foundAnanas?.name).to.equal(IngredientsBase.Ananas);
      expect(foundOlives?.name).to.equal(IngredientsBase.Olives);
      expect(foundPaprika).to.null;
    });

    it("Falsy - you get none of the ingredients", () => {
      //given
      const ingredients = Ingredients.getInstance();

      //when
      const ingredientsWeWant: IngredientsBase[] = [
        IngredientsBase.Salad,
        IngredientsBase.Potato,
      ];

      const ingredientsWeGet: Map<IngredientsBase, Ingredient> =
        ingredients.compareIngredientsWithStock(
          ingredientsWeWant
        ).ingredientsFound;

      const foundSalad: Ingredient | null = lookForIngredient(
        ingredientsWeGet,
        IngredientsBase.Salad
      );
      const foundPotato: Ingredient | null = lookForIngredient(
        ingredientsWeGet,
        IngredientsBase.Potato
      );

      //then
      expect(foundSalad).to.null;
      expect(foundPotato).to.null;
    });
  });

  describe("Purchasing ingredients", () => {
    beforeEach(() => {
      const ingredients = Ingredients.getInstance();
      ingredients.getAllIngredients().clear();
    });

    it("Truthy - add new ingredient", () => {
      //given
      const ingredients = Ingredients.getInstance();
      let ingredientPotatoDto: IngredientDto = {
        name: IngredientsBase.Potato,
        price: 4,
        quantity: 1,
      };
      const newIngredient =
        ingredients.purchaseIngredients(ingredientPotatoDto);

      //when
      const foundIngredient = newIngredient
        ? ingredients.getAllIngredients().get(newIngredient?.name)
        : null;

      //then
      expect(newIngredient?.id).to.equal(foundIngredient?.id);
    });

    it("Truthy - increase quantity of the existing ingredient", () => {
      //given
      const ingredients = Ingredients.getInstance();
      let ingredientPotatoDto: IngredientDto = {
        name: IngredientsBase.Potato,
        price: 4,
        quantity: 1,
      };
      const newIngredient =
        ingredients.purchaseIngredients(ingredientPotatoDto);

      ingredients.purchaseIngredients(ingredientPotatoDto);

      //when
      const potatoQuantity = newIngredient
        ? ingredients.getAllIngredients().get(newIngredient.name)?.quantity
        : null;

      const potatoQuantityShouldBe = 2;

      //then
      expect(potatoQuantity).to.equal(potatoQuantityShouldBe);
    });

    it("Falsy - the price of ingredient is less or equal to zero", () => {
      //given
      const ingredients = Ingredients.getInstance();
      let ingredientPotatoDto: IngredientDto = {
        name: IngredientsBase.Potato,
        price: -1,
        quantity: 1,
      };

      //when, then
      expect(function () {
        ingredients.purchaseIngredients(ingredientPotatoDto);
      }).to.throw(Error);
    });

    it("Falsy - the quantity of ingredient is less then zero", () => {
      //given
      const ingredients = Ingredients.getInstance();
      let ingredientPotatoDto: IngredientDto = {
        name: IngredientsBase.Potato,
        price: 1,
        quantity: -1,
      };

      //when, then
      expect(function () {
        ingredients.purchaseIngredients(ingredientPotatoDto);
      }).to.throw(Error);
    });
  });

  describe("Calculating costs of ingredients", () => {
    beforeEach(() => {
      const ingredients = Ingredients.getInstance();
      let ingredientOlivesDto: IngredientDto = {
        name: IngredientsBase.Olives,
        price: 4,
        quantity: 1,
      };
      let ingredientAnanasDto: IngredientDto = {
        name: IngredientsBase.Ananas,
        price: 4,
        quantity: 1,
      };
      ingredients.purchaseIngredients(ingredientOlivesDto);
      ingredients.purchaseIngredients(ingredientAnanasDto);
    });

    afterEach(() => {
      const ingredients = Ingredients.getInstance();
      ingredients.getAllIngredients().clear();
    });

    it("Truthy - all ingredients were found and the costs was return", () => {
      //given
      const ingredients = Ingredients.getInstance();

      const ingredientsNeedeForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.Ananas, quantity: 1 },
        { name: IngredientsBase.Olives, quantity: 1 },
      ];

      //when
      const costOfIngredientsForPizza = ingredients.calculateIngredientsCosts(
        ingredientsNeedeForPizza
      );
      const properCosts = 8;

      //then
      expect(costOfIngredientsForPizza).to.equal(properCosts);
    });

    it("Falsy - some ingredients for pizza weren't found, can't calculate the costs, return 0", () => {
      //given
      const ingredients = Ingredients.getInstance();

      const ingredientsNeedeForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.Ananas, quantity: 1 },
        { name: IngredientsBase.Tomato, quantity: 1 },
      ];

      //when
      const costOfIngredientsForPizza = ingredients.calculateIngredientsCosts(
        ingredientsNeedeForPizza
      );
      const properCosts = 0;

      //then
      expect(costOfIngredientsForPizza).to.equal(properCosts);
    });
  });
});
