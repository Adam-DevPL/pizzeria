import { Ingredients } from "./src/Ingredient/Ingredients";

const ingredients = Ingredients.getInstance();
ingredients.addNewIngredient("Jablko", 100, 5);
console.log(ingredients);
ingredients.changeProperty("Jablko", "quantity", 45);
console.log(ingredients);

