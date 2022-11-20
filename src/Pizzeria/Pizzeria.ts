export class Pizzeria {
  private static instance: Pizzeria;

  private constructor() {};

  public static getInstance(): Pizzeria {
    if (!Pizzeria.instance) {
      Pizzeria.instance = new Pizzeria();
    }
    return Pizzeria.instance;
  }
}