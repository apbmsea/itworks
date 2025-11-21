import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee", EmployeeSchema);
