export class Table {
  private static instance: Table;

  private constructor() {}

  public static getInstance(): Table {
    if (!Table.instance) {
      Table.instance = new Table();
    }
    return Table.instance;
  }
}
