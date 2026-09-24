import { Request, Response } from "express";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";

const service = new UserService(new UserRepository());

export const register = async (req: Request, res: Response) => {
    const user = await service.register(req.body.sanitizedRegisterInput);

    if (!user)
        return res.status(400).json({ message: "User already exists" });

    return res.status(201).json({ message: "User registered", data: user });
}

export const login = async (req: Request, res: Response) => {
    const token = await service.login(req.body.sanitizedLoginInput);

    if (!token)
        return res.status(401).json({ message: "Invalid credentials" });

    return res.json({ token });
}
