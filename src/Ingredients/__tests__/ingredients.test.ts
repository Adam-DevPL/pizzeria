import "mocha";
import { expect } from "chai";

import { Ingredient } from "../Ingredient";
import { Ingredients } from "../Ingredients";
import {
  IngredientDto,
  IngredientsBase,
  ReceipeIngredient,
} from "../IIngredient";

describe("Ingredients", () => {
  describe("Get ingredients with price from the storage", () => {
    beforeEach(() => {
      const ingredients = Ingredients.getInstance();
      ingredients.getAllIngredients().clear();
    });

    it("Truthy - you get all ingredients from the storage of Pizzeria", () => {
      //given
      const ingredients: Ingredients = Ingredients.getInstance();
      let ingredientOlivesDto: IngredientDto = {
        name: IngredientsBase.olives,
        price: 4,
        quantity: 1,
      };
      let ingredientAnanasDto: IngredientDto = {
        name: IngredientsBase.ananas,
        price: 4,
        quantity: 1,
      };
      ingredients.purchaseIngredients(ingredientOlivesDto);
      ingredients.purchaseIngredients(ingredientAnanasDto);

      //when
      const ingredientsWeWant: IngredientsBase[] = [
        IngredientsBase.olives,
        IngredientsBase.ananas,
      ];
      const ingredientsWeGet: {
        ingredientsFound: Map<string, Ingredient>;
        ingredientsNotFound: IngredientsBase[];
      } = ingredients.compareIngredientsWithStock(ingredientsWeWant);
      const ananas: IngredientsBase = IngredientsBase.ananas;
      const olives: IngredientsBase = IngredientsBase.olives;
      let foundAnanas: boolean = false;
      let foundOlives: boolean = false;
      ingredientsWeGet.ingredientsFound.forEach((ingredient) => {
        if (ingredient.name === ananas) {
          foundAnanas = true;
        }
        if (ingredient.name === olives) {
          foundOlives = true;
        }
      });

      //then
      expect(foundAnanas).to.true;
      expect(foundOlives).to.true;
    });

    it("Falsy - you get some of the ingredients form the storage", () => {
      //given
      const ingredients = Ingredients.getInstance();
      let ingredientOlivesDto: IngredientDto = {
        name: IngredientsBase.olives,
        price: 4,
        quantity: 1,
      };
      let ingredientAnanasDto: IngredientDto = {
        name: IngredientsBase.ananas,
        price: 4,
        quantity: 1,
      };
      ingredients.purchaseIngredients(ingredientOlivesDto);
      ingredients.purchaseIngredients(ingredientAnanasDto);

      //when
      const ingredientsWeWant: IngredientsBase[] = [
        IngredientsBase.olives,
        IngredientsBase.ananas,
        IngredientsBase.paprika,
      ];

      const ingredientsWeGet: {
        ingredientsFound: Map<string, Ingredient>;
        ingredientsNotFound: IngredientsBase[];
      } = ingredients.compareIngredientsWithStock(ingredientsWeWant);

      const ananas: IngredientsBase = IngredientsBase.ananas;
      const olives: IngredientsBase = IngredientsBase.olives;
      const paprika: IngredientsBase = IngredientsBase.paprika;

      let foundAnanas: boolean = false;
      let foundOlives: boolean = false;
      let foundPaprika: boolean = false;

      ingredientsWeGet.ingredientsFound.forEach((ingredient) => {
        if (ingredient.name === ananas) {
          foundAnanas = true;
        }
        if (ingredient.name === olives) {
          foundOlives = true;
        }
        if (ingredient.name === paprika) {
          foundPaprika = true;
        }
      });

      //then
      expect(foundAnanas).to.true;
      expect(foundOlives).to.true;
      expect(foundPaprika).to.false;
    });

    it("Falsy - you get none of the ingredients", () => {
      //given
      const ingredients = Ingredients.getInstance();
      let ingredientOlivesDto: IngredientDto = {
        name: IngredientsBase.olives,
        price: 4,
        quantity: 1,
      };
      let ingredientAnanasDto: IngredientDto = {
        name: IngredientsBase.ananas,
        price: 4,
        quantity: 1,
      };
      ingredients.purchaseIngredients(ingredientOlivesDto);
      ingredients.purchaseIngredients(ingredientAnanasDto);

      //when
      const ingredientsWeWant: IngredientsBase[] = [
        IngredientsBase.salad,
        IngredientsBase.potato,
      ];

      const ingredientsWeGet: {
        ingredientsFound: Map<string, Ingredient>;
        ingredientsNotFound: IngredientsBase[];
      } = ingredients.compareIngredientsWithStock(ingredientsWeWant);

      const salad: IngredientsBase = IngredientsBase.salad;
      const potato: IngredientsBase = IngredientsBase.potato;

      let foundSalad: boolean = false;
      let foundPotato: boolean = false;

      ingredientsWeGet.ingredientsFound.forEach((ingredient) => {
        if (ingredient.name === salad) {
          foundSalad = true;
        }
        if (ingredient.name === potato) {
          foundPotato = true;
        }
      });

      //then
      expect(foundSalad).to.false;
      expect(foundPotato).to.false;
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
        name: IngredientsBase.potato,
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
        name: IngredientsBase.potato,
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
        name: IngredientsBase.potato,
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
        name: IngredientsBase.potato,
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
      ingredients.getAllIngredients().clear();
    });

    it("Truthy - all ingredients were found and the costs was return", () => {
      //given
      const ingredients = Ingredients.getInstance();
      let ingredientOlivesDto: IngredientDto = {
        name: IngredientsBase.olives,
        price: 4,
        quantity: 1,
      };
      let ingredientAnanasDto: IngredientDto = {
        name: IngredientsBase.ananas,
        price: 4,
        quantity: 1,
      };
      ingredients.purchaseIngredients(ingredientOlivesDto);
      ingredients.purchaseIngredients(ingredientAnanasDto);

      const ingredientsNeedeForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.olives, quantity: 1 },
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
      let ingredientOlivesDto: IngredientDto = {
        name: IngredientsBase.olives,
        price: 4,
        quantity: 1,
      };
      let ingredientAnanasDto: IngredientDto = {
        name: IngredientsBase.ananas,
        price: 4,
        quantity: 1,
      };
      ingredients.purchaseIngredients(ingredientOlivesDto);
      ingredients.purchaseIngredients(ingredientAnanasDto);

      const ingredientsNeedeForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.tomato, quantity: 1 },
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
