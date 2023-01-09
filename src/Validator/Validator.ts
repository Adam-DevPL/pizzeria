export class Validator {
  public static validateStringNotEmpty = (name: string) => {
    if (!name || name.length === 0) {
      throw new Error("It's not valid name or it's empty");
    }
  };

  public static validatePriceIfMoreThenZero = (value: number) => {
    if (value <= 0) {
      throw new Error("The price must be more tehn zero");
    }
  };
  public static validateQuantityIfMoreThenZero = (value: number) => {
    if (value < 0) {
      throw new Error("The quantity is less then zero!");
    }
  };
  public static validateNumberMoreOrEqualZero = (value: number) => {
    if (value <= 0) {
      throw new Error("The number must be greater than zero!");
    }
  };
  public static validateName = (value: string) => {
    if (value.length === 0) {
      throw new Error("The name can't be empty");
    }
  };
  public static validateDiscount = (value: number) => {
    if (value < 0 || value > 100) {
      throw new Error("Discount can't be less then zero or greater then 100");
    }
  };

  public static validateNumberOfIngredients = (noOfIngredients: number) => {
    if (noOfIngredients < 3) {
      throw new Error("Not enaught ingredients to create pizza receipe");
    }
  };

  public static validatePizzasNoInOrder = (value: number) => {
    if (value < 1) {
      throw new Error("You can't order nothing");
    }
  };
}
