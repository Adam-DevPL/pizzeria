export class Validator {
  public static validateStringNotEmpty(name: string) {
    if (!name || name.length === 0) {
      return 0;
    }

    else return 1;
  }
}