import { Router } from "express";
import { sanitizeLoginInput, sanitizeRegisterInput } from "./user.validations.js";
import { login, register } from "./user.controller.js";

export const userRouter = Router();

userRouter.post("/register", sanitizeRegisterInput, register)
userRouter.post("/login", sanitizeLoginInput, login)
