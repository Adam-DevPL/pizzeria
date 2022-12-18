import { IEmployee, Role } from "./IEmployee";

export class Employee implements IEmployee {
  private _id: string;
  private _name: string;
  private _role: Role;
  private _isFree: boolean;

  constructor(id: string, name: string, role: Role, isFree: boolean = true) {
    this._id = id;
    this._name = name;
    this._role = role;
    this._isFree = isFree;
  }

  get id() {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
  get name() {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  get role() {
    return this._role;
  }

  set role(value: Role) {
    this._role = value;
  }
  get isFree() {
    return this._isFree;
  }

  set isFree(value: boolean) {
    this._isFree = value;
  }
}
