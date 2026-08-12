import { Router } from "express";
import { sanitizeAuthorInput } from "./author.validations.js";
import { create, findAll, findOne, remove, update } from "./author.controller.js";

export const authorRouter = Router();

authorRouter.get("/", findAll)
authorRouter.get("/:id", findOne)
authorRouter.post("/", sanitizeAuthorInput, create)
authorRouter.put("/:id", sanitizeAuthorInput, update)
authorRouter.patch("/:id", sanitizeAuthorInput, update)
authorRouter.delete("/:id", remove)
