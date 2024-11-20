import bcrypt from "bcrypt";

import throwIfMissing from "../helpers/throwIfMissing";
import { JWTObject, Repositories } from "../types/common";
import { jwtSign, jwtVerify } from "../helpers/jwt";
import config from "../config";
import { UserRepository } from "../repositories/user.repository";
import { Error401 } from "../errors/http.errors";
import { JwtPayload } from "jsonwebtoken";
import throwIfNotEmail from "../helpers/throwIfNotEmail";

/**
 * Authentication Service
 */
export class AuthService {
  name = "authService";
  userRepository: UserRepository;

  constructor(ctx: { repositories: Repositories }) {
    this.userRepository = ctx.repositories.userRepository;
  }

  async login(email: string, password: string) {
    throwIfMissing(email, "email is required!", 400);
    throwIfNotEmail(email, "Invalid email format!", 400);
    throwIfMissing(password, "password is required!", 400);

    const data = await this.userRepository.findUserByEmail(email);
    if (!data) {
      throw new Error401({ message: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password!, data.password);
    if (!isValid) {
      throw new Error401({ message: "Invalid email or password" });
    }

    return {
      ...(await this.generateTokens({
        id: data.id,
        roleId: data.roleId,
      })),
      id: data.id,
      role: {
        id: data.roleId,
        name: data.role.name,
      }
    };
  }

  async refreshToken(refreshToken: string) {
    throwIfMissing(refreshToken, "refreshToken is required!", 400);
    let decodedJwt: JwtPayload;

    try {
      decodedJwt = jwtVerify(refreshToken as string) as JwtPayload;
    } catch (error) {
      throw new Error401({ message: "Invalid refresh token" });
    }

    if (decodedJwt.type !== "refresh_token") {
      throw new Error401({ message: "Invalid refresh token" });
    }

    const data = await this.userRepository.findUserById(decodedJwt.id);

    if (!data) {
      throw new Error401({ message: "User not found" });
    }

    return await this.generateTokens({
      id: data.id,
      roleId: data.roleId,
    });
  }

  async generateTokens(payload: JWTObject) {
    const accessToken = jwtSign(
      { ...payload, type: "access_token" },
      { canExpired: true, expiredTime: config.jwt.expired }
    );
    const refreshToken = jwtSign(
      { ...payload, type: "refresh_token" },
      { canExpired: true, expiredTime: config.jwt.refreshExpired }
    );

    return { accessToken, refreshToken };
  }
}

export default AuthService;
