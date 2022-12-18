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
        { name: IngredientsBase.tomato, quantity: 2 },
      ];

      //when
      const newReceipe: Pizza = pizzas.addPizzaReceipe(
        margharita,
        ingredientsForPizza
      ) as Pizza;

      const foundReceipe: Pizza | null = pizzas.findPizzaByName(
        newReceipe.name
      );

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
        { name: IngredientsBase.tomato, quantity: 2 },
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

    it("Error - not enaugh ingredients to create new pizz receipe", () => {
      //given
      const pizzas = Pizzas.getInstance();
      const margharita = PizzaType.margharita;
      const ingredientsForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.olives, quantity: 4 },
      ];

      //when, then
      expect(function () {
        pizzas.addPizzaReceipe(margharita, ingredientsForPizza);
      }).to.throw(Error);
    });
  });

  describe("remove pizza receipe", () => {
    beforeEach(() => {
      const pizzas = Pizzas.getInstance();
      pizzas.getAllReceipes().clear();
    });

    it("Success - pizza receipe successfully removed", () => {
      //given
      const pizzas: Pizzas = Pizzas.getInstance();
      const margharita = PizzaType.margharita;
      const ingredientsForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.olives, quantity: 4 },
        { name: IngredientsBase.tomato, quantity: 2 },
      ];
      const newReceipe: Pizza = pizzas.addPizzaReceipe(
        margharita,
        ingredientsForPizza
      ) as Pizza;

      //when
      const isSuccess: boolean = pizzas.removePizzaReceipe(newReceipe.name);

      //then
      expect(isSuccess).to.be.true;
    });

    it("Failure - pizza can't be removed - not existing", () => {
      //given
      const pizzas: Pizzas = Pizzas.getInstance();
      const margharita = PizzaType.margharita;

      //when
      const isSuccess: boolean = pizzas.removePizzaReceipe(margharita);

      //then
      expect(isSuccess).to.be.false;
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
        { name: IngredientsBase.ananas, quantity: 1 },
      ];
      pizzas.addPizzaReceipe(margharita, ingredientsForMargharita);
      const hawaian = PizzaType.margharita;
      const ingredientsForHawaian: ReceipeIngredient[] = [
        { name: IngredientsBase.ananas, quantity: 1 },
        { name: IngredientsBase.olives, quantity: 4 },
        { name: IngredientsBase.paprika, quantity: 1 },
      ];
      pizzas.addPizzaReceipe(hawaian, ingredientsForHawaian);

      const orderedPizzas: PizzaType[] = [margharita, hawaian];

      //when
      const foundedPizzas: Map<PizzaType, Pizza>  =
        pizzas.getAllPizzasFromOrder(orderedPizzas) as Map<PizzaType, Pizza>;
      const foundMargharita: Pizza | undefined = foundedPizzas.get(margharita);
      const foundHawaian: Pizza | undefined = foundedPizzas.get(hawaian);

      //then
      expect(foundMargharita?.name).to.equal(margharita);
      expect(foundHawaian?.name).to.equal(hawaian);
    });
  });
});
