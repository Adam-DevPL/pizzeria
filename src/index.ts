import { Employees } from "./Employees/Employees";
import { Role } from "./Employees/IEmployee";
import { IngredientsBase } from "./Ingredients/IIngredient";
import { PizzaType } from "./Pizzas/IPizza";
import { Pizzeria } from "./Pizzeria/Pizzeria";

const pizzeria = new Pizzeria();

const waiterMsg = pizzeria.hireNewEmployee({ name: "Adam", role: Role.waiter });
console.log({waiterMsg});

// const chefMsg = pizzeria.hireNewEmployee({ name: "Dawid", role: Role.chef });
// console.log({chefMsg});

const tabelMsg = pizzeria.purchaseNewTable({ tableNumber: 1, numberOfSeats: 4 });
console.log({tabelMsg});

const ingr1 = pizzeria.purchaseIngredients(IngredientsBase.potato, 4, 4);
const ingr2 = pizzeria.purchaseIngredients(IngredientsBase.tomato, 4, 4);
const ingr3 = pizzeria.purchaseIngredients(IngredientsBase.olives, 4, 4);
console.log(ingr1, ingr2);

const pizza = pizzeria.createPizza(PizzaType.margharita, [
  { name: IngredientsBase.potato, quantity: 1 },
  { name: IngredientsBase.tomato, quantity: 1 },
  { name: IngredientsBase.olives, quantity: 1 },
]);
console.log({pizza});

const voucherMsg = pizzeria.addNewVoucher({ name: "special", discount: 10, weekDay: null });
console.log({voucherMsg});

const outcome = pizzeria.makeNewOrder(4, [PizzaType.margharita], "special");
console.log({outcome});
