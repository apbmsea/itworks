import { Employee } from "../models/Employee";

class EmployeeService {
  async createEmployee(data: any) {
    return await Employee.create(data);
  }
}

export const employeeService = new EmployeeService();
