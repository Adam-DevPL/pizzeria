import { expect } from "chai";
import {
  IngredientsBase,
  ReceipeIngredient,
} from "../src/Ingredients/IIngredient";
import { Pizzas } from "../src/Pizza/Pizzas";

describe("Pizza module", () => {
  describe("add new pizza receipe", () => {
    it("Truthy - added new pizza receipe successfully", () => {
      const pizzas = Pizzas.getInstance();
      const newPizzaName = "Special";
      const ingredientsForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.olives, quantity: 4 },
      ];
      const properMsg = `New receipe for ${newPizzaName} added to the database`;

      const returnMsg = pizzas.addPizzaReceipe(
        newPizzaName,
        ingredientsForPizza
      );
      const foundPizzaReceipe = pizzas.listOfPizzasReceipes.find(
        (p) => p.name === newPizzaName
      );

      expect(foundPizzaReceipe?.name).to.equal(newPizzaName);
      expect(returnMsg).to.equal(properMsg);
    });
    it("Falsy - can't add receipe if exist in db", () => {
      const pizzas = Pizzas.getInstance();
      const newPizzaName = "Special";
      const ingredientsForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.olives, quantity: 4 },
      ];
      const properMsg = `Receipe for ${newPizzaName} exist in database`;

      const returnMsg = pizzas.addPizzaReceipe(
        newPizzaName,
        ingredientsForPizza
      );

      expect(returnMsg).to.equal(properMsg);
    });
    it("Falsy - throw error when name is empty", () => {
      const pizzas = Pizzas.getInstance();
      const newPizzaName = "";
      const ingredientsForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.olives, quantity: 4 },
      ];

      expect(function () {
        pizzas.addPizzaReceipe(newPizzaName, ingredientsForPizza);
      }).to.throw(Error);
    });
  });
});
