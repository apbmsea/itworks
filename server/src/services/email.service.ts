import { VerificationCodeModel } from "../models/Codes";

function generateCode() {
  const min = 100000;
  const max = 999999;

  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

class EmailService {
  async createVerificationCode(email: string) {
    const code = generateCode();

    await VerificationCodeModel.create({ email, code });

    console.log(code);
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    const record = await VerificationCodeModel.findOne({ email, code });

    if (!record) return false;

    await VerificationCodeModel.deleteOne({ _id: record._id });

    return true;
  }
}

export const emailService = new EmailService();
