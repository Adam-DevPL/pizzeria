import { IngredientsBase } from "./src/Ingredient/IIngredient";
import { Ingredients } from "./src/Ingredient/Ingredients";
import { Pizzeria } from "./src/Pizzeria/Pizzeria";

const pizzeria = Pizzeria.getInstance();
pizzeria.hireNewEmployee("Adam", "waiter");
pizzeria.hireNewEmployee("Majenka", "chef");
pizzeria.purchaseNewTable(1, 4);
pizzeria.purchaseIngredients(IngredientsBase.potato, 4, 4);
pizzeria.createPizza("Marghariat", [{name: IngredientsBase.tomato, quantity: 2}])

