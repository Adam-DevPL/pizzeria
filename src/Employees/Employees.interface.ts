import { Employee } from "./Employee";
import { EmployeeDto, Role } from "./Employee.types";

export interface IEmployees {
  getAllEmployees: () => Map<string, Employee>;
  getAllFreeEmployees: () => Map<string, Employee>;
  getAllOccupiedEmployees: () => Map<string, Employee>;
  findEmployeeByRole: (role: Role) => Employee | null;
  addNewEmployee: (employeeDto: EmployeeDto) => Employee;
  removeEmployee: (employeeId: string) => boolean;
  changeStatusOfEmployee: (employeeId: string) => boolean;
}