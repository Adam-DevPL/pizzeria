import { Role } from "./Employees/Employee.types";
import { Injector } from "./Injector/Injector.service";
import { Pizzeria } from "./Pizzeria/Pizzeria.service";

const pizzeria = Injector.resolve(Pizzeria);
pizzeria.hireNewEmployee({name: "Adam", role: Role.Chef});
console.log(pizzeria);
