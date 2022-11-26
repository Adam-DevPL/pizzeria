import { IngredientsBase } from "./src/Ingredient/IIngredient";
import { Ingredients } from "./src/Ingredient/Ingredients";
import { Pizzeria } from "./src/Pizzeria/Pizzeria";

const pizzeria = Pizzeria.getInstance();
pizzeria.hireNewEmployee("Adam", "waiter");
pizzeria.hireNewEmployee("Majenka", "chef");
pizzeria.purchaseNewTable(1, 4);
pizzeria.purchaseIngredients(IngredientsBase.tomato, 4, 4);
pizzeria.createPizza("Marghariat", [{name: IngredientsBase.tomato, quantity: 2}]);
pizzeria.makeNewOrder(1, 4, pizzeria.pizzas);
console.log(pizzeria);


