import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./jwt.js";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];

    if (!token)
        return res.status(401).json({ message: "Unauthorized" });

    try {
        jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
