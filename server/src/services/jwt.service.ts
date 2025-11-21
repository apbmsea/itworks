import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

class JwtService {
  generateTokens(payload: any): Tokens {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  generateAccessToken(payload: any) {
    const accessToken = jwt.sign(payload, config.jwt.accessSecret, {
      expiresIn: "15m",
    });

    return accessToken;
  }

  generateRefreshToken(payload: any) {
    const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: "30d",
    });

    return refreshToken;
  }
}

export const jwtService = new JwtService();
