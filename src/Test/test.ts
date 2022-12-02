import { it } from "node:test";
import { Employee } from "../Employees/Employees";

const chai = require("chai");
const expect = chai.expect;


describe("Employee", () => {
  it("adding new employee", () => {
    const employees = Employee.getInstance();
    employees.addNewEmployee("Adam", "waiter");
    const foundEmployee = employees.listOfEmployees.find(employee => employee.name === "Adam");
    expect(foundEmployee?.name).to.equal("Adam");
  })
})