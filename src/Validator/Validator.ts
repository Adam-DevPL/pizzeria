export class Validator {
  public static validateStringNotEmpty(name: string) {
    if (!name || name.length === 0) {
      return 0;
    }

    return 1;
  }

  public static validateNumberNotToBeLessThenZero(value: number) {
    if (value < 0) {
      return 0;
    }

    return 1;
  }
}
