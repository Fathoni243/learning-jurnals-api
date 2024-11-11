import { Application, Request, Response } from "express";

import { ConfigProps } from "../config";
import AuthService from "../services/auth.service";
import UserRepository from "../repositories/user.repository";

export interface AppServer<services = Services> extends Application {
  services: services;
  config: ConfigProps;
}

export interface BaseRequest<services = Services>
  extends Omit<Request<object, any, any, any, Record<string, any>>, "Application"> {
  app: AppServer<services>;
}

export interface BaseResponse<Data = any> extends Response<{ message: string; data?: Data }> {}

export interface JWTObject {
  id: string;
  roleId: string | null;
  type?: "access_token" | "refresh_token";
}

export interface UserFromJwt {
  id: string;
  fullName: string;
  email: string;
}

export interface Repositories {
  userRepository: UserRepository;
}

export interface Services {
  authService: AuthService;
}

export interface Pagination {
  limit?: number;
  offset?: number;
}

export interface Search {
  search?: string;
}
