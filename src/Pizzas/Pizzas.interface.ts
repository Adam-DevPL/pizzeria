import { Pizza } from "./Pizza";
import { PizzaDto, PizzaType } from "./Pizza.types";

export interface IPizzas {
  findPizzaByName: (pizzaName: PizzaType) => Pizza | null;
  getAllReceipes: () => Map<PizzaType, Pizza>;
  addPizzaReceipe: (pizzaDto: PizzaDto) => Pizza;
  removePizzaReceipe: (pizzaType: PizzaType) => boolean;
  getAllPizzasFromOrder: (pizzasOrdered: PizzaType[]) => Map<PizzaType, Pizza>;
}
