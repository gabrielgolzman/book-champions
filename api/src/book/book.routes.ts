import { Router } from "express";
import { sanitizeBookInput } from "./book.validations.js";
import { create, findAll, findOne, remove, update } from "./book.controller.js";

export const bookRouter = Router();

bookRouter.get("/", findAll)
bookRouter.get("/:id", findOne)
bookRouter.post("/", sanitizeBookInput, create)
bookRouter.put("/:id", sanitizeBookInput, update)
bookRouter.patch("/:id", sanitizeBookInput, update)
bookRouter.delete("/:id", remove)
