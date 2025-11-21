import { Request, Response } from "express";
import { employeeService } from "../services/employee.service";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      res.status(400).json({ message: "Missing required fields: email, role" });
      return;
    }

    if (role === "Employee") {
      const employee = await employeeService.createEmployee({ email });

      if (!employee) {
        res.status(400).json({ message: "Employee creation failed" });
        return;
      }
    }

    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
