import { Employees } from "./Employees/Employees";
import { Role } from "./Employees/IEmployee";
import { IngredientsBase } from "./Ingredients/IIngredient";
import { PizzaType } from "./Pizzas/IPizza";
import { Pizzeria } from "./Pizzeria/Pizzeria";

const pizzeria = new Pizzeria();
pizzeria.hireNewEmployee("Adam", Role.waiter);
pizzeria.hireNewEmployee("Dawid", Role.chef);
pizzeria.purchaseNewTable(1, 4);
pizzeria.purchaseIngredients(IngredientsBase.potato, 4, 4);
pizzeria.purchaseIngredients(IngredientsBase.tomato, 4, 4);
pizzeria.createPizza(PizzaType.margharita, [
  { name: IngredientsBase.potato, quantity: 1 },
  { name: IngredientsBase.tomato, quantity: 1 },
]);
pizzeria.addNewVoucher("special", 10);
const outcome = pizzeria.makeNewOrder(4, [PizzaType.margharita], "special", 10);
console.log(outcome);


