import mongoose, { Schema, Document } from "mongoose";

interface IVerificationCode extends Document {
  email: string;
  code: string;
  createdAt: Date;
}

const verificationCodeSchema = new Schema<IVerificationCode>(
  {
    email: { type: String, required: true },
    code: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

verificationCodeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export const VerificationCodeModel = mongoose.model<IVerificationCode>(
  "VerificationCode",
  verificationCodeSchema
);
