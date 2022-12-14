import { expect } from "chai";
import {
  IngredientsBase,
  ReceipeIngredient,
} from "../../Ingredients/IIngredient";
import { PizzaType } from "../IPizza";
import { Pizza } from "../Pizza";
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
      const newReceipe: Pizza | null = pizzas.addPizzaReceipe(
        margharita,
        ingredientsForPizza
      );

      const foundReceipe: Pizza | null = newReceipe
        ? pizzas.findPizzaByName(newReceipe?.name)
        : null;

      //then
      expect(newReceipe?.id).to.equal(foundReceipe?.id);
      expect(newReceipe?.name).to.equal(PizzaType.margharita);
      expect(newReceipe?.ingredients[0].quantity).to.equal(1);
    });

    it("Falsy - can't add receipe if exist in db", () => {
      //given
      const pizzas = Pizzas.getInstance();
      const margharita = PizzaType.margharita;
      const ingredientsForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.olives, quantity: 4 },
      ];
      pizzas.addPizzaReceipe(margharita, ingredientsForPizza);

      //when
      const doubleReceipe = pizzas.addPizzaReceipe(
        margharita,
        ingredientsForPizza
      );

      //then
      expect(doubleReceipe).to.null;
    });
  });
  describe("get all pizza's receipe based on ordered pizzas", () => {
    beforeEach(() => {
      const pizzas = Pizzas.getInstance();
      pizzas.getAllReceipes().clear();
    });

    it("Order with two pizzas, return receipes for these 2 pizzas", () => {
      //given
      const pizzas = Pizzas.getInstance();
      const margharita = PizzaType.margharita;
      const ingredientsForMargharita: ReceipeIngredient[] = [
        { name: IngredientsBase.tomato, quantity: 1 },
        { name: IngredientsBase.olives, quantity: 4 },
      ];
      pizzas.addPizzaReceipe(margharita, ingredientsForMargharita);
      const hawaian = PizzaType.margharita;
      const ingredientsForHawaian: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.olives, quantity: 4 },
      ];
      pizzas.addPizzaReceipe(hawaian, ingredientsForHawaian);

      const orderedPizzas: PizzaType[] = [margharita, hawaian];

      //when
      const foundedPizzas: Map<PizzaType, Pizza> =
        pizzas.getAllPizzasFromOrder(orderedPizzas);
      const foundMargharita: Pizza | undefined = foundedPizzas.get(margharita);
      const foundHawaian: Pizza | undefined = foundedPizzas.get(hawaian);

      //then
      expect(foundMargharita?.name).to.equal(margharita);
      expect(foundHawaian?.name).to.equal(hawaian);
    });
  });
});
