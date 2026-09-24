import { Router } from "express";
import { verifyToken } from "../shared/auth/auth.middleware.js";
import { sanitizeBookInput } from "./book.validations.js";
import { create, findAll, findOne, remove, update } from "./book.controller.js";

export const bookRouter = Router();

bookRouter.get("/", findAll)
bookRouter.get("/:id", findOne)
bookRouter.post("/", verifyToken, sanitizeBookInput, create)
bookRouter.put("/:id", verifyToken, sanitizeBookInput, update)
bookRouter.patch("/:id", verifyToken, sanitizeBookInput, update)
bookRouter.delete("/:id", verifyToken, remove)
