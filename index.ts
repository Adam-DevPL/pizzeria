import { IngredientsBase } from "./src/Ingredient/IIngredient";
import { Ingredients } from "./src/Ingredient/Ingredients";
import { Pizzeria } from "./src/Pizzeria/Pizzeria";

const pizzeria = Pizzeria.getInstance();
pizzeria.hireNewEmployee("Adam", "waiter");
pizzeria.hireNewEmployee("Majenka", "chef");
pizzeria.purchaseNewTable(1, 4);

const ingredients = Ingredients.getInstance();
ingredients.purchaseIngredients(IngredientsBase.potato, 5.55, 10);
console.log(ingredients);


