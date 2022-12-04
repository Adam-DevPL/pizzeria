import "mocha";
import { expect } from "chai";

import { Ingredient } from "../Ingredient";
import { Ingredients } from "../Ingredients";
import { IngredientsBase, ReceipeIngredient } from "../IIngredient";

describe("Ingredients", () => {
  describe("Get ingredients with price from the storage", () => {
    beforeEach(() => {
      const ingredients = Ingredients.getInstance();
      ingredients.getAllIngredients().clear();
    });
    it("Truthy - you get all ingredients from the storage of Pizzeria", () => {
      const ingredients: Ingredients = Ingredients.getInstance();
      ingredients.purchaseIngredients(IngredientsBase.olives, 4, 1);
      ingredients.purchaseIngredients(IngredientsBase.ananas, 4, 1);

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

      expect(foundAnanas).to.true;
      expect(foundOlives).to.true;
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

      expect(foundAnanas).to.true;
      expect(foundOlives).to.true;
      expect(foundPaprika).to.false;
    });
    it("Falsy - you get none of the ingredients", () => {
      const ingredients = Ingredients.getInstance();
      ingredients.purchaseIngredients(IngredientsBase.olives, 4, 1);
      ingredients.purchaseIngredients(IngredientsBase.ananas, 4, 1);

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
      const ingredients = Ingredients.getInstance();
      const newIngredient = ingredients.purchaseIngredients(
        IngredientsBase.potato,
        4,
        1
      );

      const foundIngredient = newIngredient
        ? ingredients.getAllIngredients().get(newIngredient?.id)
        : null;

      expect(newIngredient?.id).to.equal(foundIngredient?.id);
    });

    it("Truthy - increase quantity of the existing ingredient", () => {
      const ingredients = Ingredients.getInstance();
      const newIngredient = ingredients.purchaseIngredients(
        IngredientsBase.potato,
        4,
        1
      );
      
      ingredients.purchaseIngredients(IngredientsBase.potato, 4, 1);
      const potatoQuantity = newIngredient
        ? ingredients.getAllIngredients().get(newIngredient.id)?.quantity
        : null;
        
      const potatoQuantityShouldBe = 2;

      expect(potatoQuantity).to.equal(potatoQuantityShouldBe);
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
    beforeEach(() => {
      const ingredients = Ingredients.getInstance();
      ingredients.getAllIngredients().clear();
    });
    
    it("Truthy - all ingredients were found and the costs was return", () => {
      const ingredients = Ingredients.getInstance();
      ingredients.purchaseIngredients(IngredientsBase.olives, 4, 1);
      ingredients.purchaseIngredients(IngredientsBase.ananas, 4, 1);

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
      ingredients.purchaseIngredients(IngredientsBase.olives, 4, 1);
      ingredients.purchaseIngredients(IngredientsBase.ananas, 4, 1);
      
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
  // describe("Comapring ingredients quantities between receipe and storeage", () => {
  //   it("Truthy - should return true if we can make the pizza", () => {
  //     const ingredients = Ingredients.getInstance();
  //     console.log(ingredients);
  //     const pizza: IPizza = {name: "Pizza", ingredients: [{name: IngredientsBase.ananas, quantity: 3}]}
  //     const returnMsg = ingredients.checkQuantityOfIngredientsForPizza(pizza);
  //     expect(returnMsg).to.equal(true);
  //   });
  // });
});
