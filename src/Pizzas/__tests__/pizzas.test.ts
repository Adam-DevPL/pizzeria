import { expect } from "chai";
import {
  IngredientsBase,
  ReceipeIngredient,
} from "../../Ingredients/IIngredient";
import { PizzaType } from "../IPizza";
import { Pizzas } from "../Pizzas";

describe("Pizza module", () => {
  describe("add new pizza receipe", () => {
    beforeEach(() => {
      const pizzas = Pizzas.getInstance();
      pizzas.getAllReceipes().clear();
    });

    it("Truthy - added new pizza receipe successfully", () => {
      //given
      const pizzas = Pizzas.getInstance();
      const margharita = PizzaType.margharita;
      const ingredientsForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.olives, quantity: 4 },
      ];

      //when
      const newReceipe = pizzas.addPizzaReceipe(
        margharita,
        ingredientsForPizza
      );

      const foundReceipe = newReceipe
        ? pizzas.getReceipe(newReceipe?.id)
        : null;
        
      //then
      expect(newReceipe?.id).to.equal(foundReceipe?.id);
      expect(newReceipe?.name).to.equal(PizzaType.margharita);
      expect(newReceipe?.ingredients[0].quantity).to.equal(1);
    });
    it("Falsy - can't add receipe if exist in db", () => {
      const pizzas = Pizzas.getInstance();
      const margharita = PizzaType.margharita;
      const ingredientsForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.olives, quantity: 4 },
      ];
      pizzas.addPizzaReceipe(margharita, ingredientsForPizza);

      const doubleReceipe = pizzas.addPizzaReceipe(
        margharita,
        ingredientsForPizza
      );

      expect(doubleReceipe).to.null;
    });
  });
});
