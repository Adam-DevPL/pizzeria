import { Employees } from "./Employees/Employees";
import { Role } from "./Employees/IEmployee";

const employees = Employees.getInstance();
const resp = employees.addNewEmployee("Adam", Role.chef);
// console.log(resp);
const employee = employees.findEmployeeByRole(Role.chef);
// console.log(employee);
if (employee) {
  const change = employees.changeStatusOfEmployee(employee.id);
  console.log(change);
  console.log(employees.findEmployeeById(employee.id));
}
