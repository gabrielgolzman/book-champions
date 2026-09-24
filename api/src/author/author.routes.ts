import { Router } from "express";
import { verifyToken } from "../shared/auth/auth.middleware.js";
import { sanitizeAuthorInput } from "./author.validations.js";
import { create, findAll, findOne, remove, update } from "./author.controller.js";

export const authorRouter = Router();

authorRouter.get("/", findAll)
authorRouter.get("/:id", findOne)
authorRouter.post("/", verifyToken, sanitizeAuthorInput, create)
authorRouter.put("/:id", verifyToken, sanitizeAuthorInput, update)
authorRouter.patch("/:id", verifyToken, sanitizeAuthorInput, update)
authorRouter.delete("/:id", verifyToken, remove)
