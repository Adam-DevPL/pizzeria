import { ITable } from "./ITable";

export class Table implements ITable {
  private _id: string;
  private _tableNumber: number;
  private _isFree: boolean;
  private _numberOfSeats: number;

  constructor(
    id: string,
    tableNumber: number,
    numberOfSeats: number
  ) {
    this._id = id;
    this._tableNumber = tableNumber;
    this._isFree = true;
    this._numberOfSeats = numberOfSeats;
  }

  get id() {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  get tableNumber() {
    return this._tableNumber;
  }
  set tableNumber(value: number) {
    this._tableNumber = value;
  }
  get isFree() {
    return this._isFree;
  }
  set isFree(value: boolean) {
    this._isFree = value;
  }
  get numberOfSeats() {
    return this._numberOfSeats;
  }
  set numberOfSeats(value: number) {
    this._numberOfSeats = value;
  }
}
