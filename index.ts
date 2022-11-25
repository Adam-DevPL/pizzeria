import { Ingredients } from "./src/Ingredient/Ingredients";
import { Pizzeria } from "./src/Pizzeria/Pizzeria";

const pizzeria = Pizzeria.getInstance();
pizzeria.hireNewEmployee("Adam", "waiter");
pizzeria.hireNewEmployee("Majenka", "chef");
pizzeria.purchaseNewTable(1, 4);
pizzeria.purchaseIngredients("Pomidor", 10, 10);
pizzeria.purchaseIngredients("Salat", 5, 15);
pizzeria.purchaseIngredients("Ogor", 20, 2);
pizzeria.createPizza("Margarita")

