import { expect } from "chai";
import {
  IngredientsBase,
  ReceipeIngredient,
} from "../../Ingredients/Ingredient.types";
import { PizzaDto, PizzaType } from "../Pizza.types";
import { Pizza } from "../Pizza";
import { Pizzas } from "../Pizza.service";

describe("Pizza module", () => {
  describe("add new pizza receipe", () => {
    // beforeEach(() => {
    //   const pizzas = Pizzas.getInstance();
    //   pizzas.getAllReceipes().clear();
    // });

    // afterEach(() => {
    //   const pizzas = Pizzas.getInstance();
    //   pizzas.getAllReceipes().clear();
    // })

    it("Truthy - added new pizza receipe successfully", () => {
      //given
      const pizzas = new Pizzas();
      const margharita = PizzaType.Margharita;
      const ingredientsForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.Ananas, quantity: 1 },
        { name: IngredientsBase.Olives, quantity: 4 },
        { name: IngredientsBase.Tomato, quantity: 2 },
      ];

      //when
      const pizzaDto: PizzaDto = {
        pizzaName: margharita,
        ingredients: ingredientsForPizza,
      };
      const newReceipe: Pizza = pizzas.addPizzaReceipe(pizzaDto) as Pizza;

      const foundReceipe: Pizza | null = pizzas.findPizzaByName(
        newReceipe.name
      );

      //then
      expect(newReceipe?.id).to.equal(foundReceipe?.id);
      expect(newReceipe?.name).to.equal(PizzaType.Margharita);
      expect(newReceipe?.ingredients[0].quantity).to.equal(1);
    });

    it("Falsy - can't add receipe if exist in db", () => {
      //given
      const pizzas = new Pizzas();
      const margharita = PizzaType.Margharita;
      const ingredientsForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.Ananas, quantity: 1 },
        { name: IngredientsBase.Olives, quantity: 4 },
        { name: IngredientsBase.Tomato, quantity: 2 },
      ];
      const pizzaDto: PizzaDto = {
        pizzaName: margharita,
        ingredients: ingredientsForPizza,
      };
      pizzas.addPizzaReceipe(pizzaDto);

      //then
      expect(function() {pizzas.addPizzaReceipe(pizzaDto)}).to.throw(Error);
    });

    it("Error - not enaugh ingredients to create new pizz receipe", () => {
      //given
      const pizzas = new Pizzas();
      const margharita = PizzaType.Margharita;
      const ingredientsForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.Ananas, quantity: 1 },
        { name: IngredientsBase.Olives, quantity: 4 },
      ];
      const pizzaDto: PizzaDto = {
        pizzaName: margharita,
        ingredients: ingredientsForPizza,
      };

      //when, then
      expect(function () {
        pizzas.addPizzaReceipe(pizzaDto);
      }).to.throw(Error);
    });
  });

  describe("remove pizza receipe", () => {
    // beforeEach(() => {
    //   const pizzas = Pizzas.getInstance();
    //   pizzas.getAllReceipes().clear();
    // });

    it("Success - pizza receipe successfully removed", () => {
      //given
      const pizzas = new Pizzas();
      const margharita = PizzaType.Margharita;
      const ingredientsForPizza: ReceipeIngredient[] = [
        { name: IngredientsBase.Ananas, quantity: 1 },
        { name: IngredientsBase.Olives, quantity: 4 },
        { name: IngredientsBase.Tomato, quantity: 2 },
      ];
      const pizzaDto: PizzaDto = {
        pizzaName: margharita,
        ingredients: ingredientsForPizza,
      };
      const newReceipe: Pizza = pizzas.addPizzaReceipe(pizzaDto) as Pizza;

      //when
      const isSuccess: boolean = pizzas.removePizzaReceipe(newReceipe.name);

      //then
      expect(isSuccess).to.be.true;
    });

    it("Failure - pizza can't be removed - not existing", () => {
      //given
      const pizzas = new Pizzas();
      const margharita = PizzaType.Margharita;

      //when
      const isSuccess: boolean = pizzas.removePizzaReceipe(margharita);

      //then
      expect(isSuccess).to.be.false;
    });
  });

  describe("get all pizza's receipe based on ordered pizzas", () => {
    // beforeEach(() => {
    //   const pizzas = Pizzas.getInstance();
    //   pizzas.getAllReceipes().clear();
    // });

    it("Order with two pizzas, return receipes for these 2 pizzas", () => {
      //given
      const pizzas = new Pizzas();

      const margharita = PizzaType.Margharita;
      const ingredientsForMargharita: ReceipeIngredient[] = [
        { name: IngredientsBase.Tomato, quantity: 1 },
        { name: IngredientsBase.Olives, quantity: 4 },
        { name: IngredientsBase.Ananas, quantity: 1 },
      ];
      const pizzaMargharitaDto: PizzaDto = {
        pizzaName: margharita,
        ingredients: ingredientsForMargharita,
      };
      pizzas.addPizzaReceipe(pizzaMargharitaDto);
      const hawaian = PizzaType.Hawaian;
      const ingredientsForHawaian: ReceipeIngredient[] = [
        { name: IngredientsBase.Ananas, quantity: 1 },
        { name: IngredientsBase.Olives, quantity: 4 },
        { name: IngredientsBase.Paprika, quantity: 1 },
      ];
      const pizzaHawaianDto: PizzaDto = {
        pizzaName: hawaian,
        ingredients: ingredientsForHawaian,
      };
      pizzas.addPizzaReceipe(pizzaHawaianDto);

      const orderedPizzas: PizzaType[] = [margharita, hawaian];

      //when
      const foundedPizzas: Map<PizzaType, Pizza> = pizzas.getAllPizzasFromOrder(
        orderedPizzas
      ) as Map<PizzaType, Pizza>;
      const foundMargharita: Pizza | undefined = foundedPizzas.get(margharita);
      const foundHawaian: Pizza | undefined = foundedPizzas.get(hawaian);

      //then
      expect(foundMargharita?.name).to.equal(margharita);
      expect(foundHawaian?.name).to.equal(hawaian);
    });
  });
});
