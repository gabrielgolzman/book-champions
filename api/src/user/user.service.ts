import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "./user.repository.js";
import { User } from "./user.entity.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../shared/auth/jwt.js";

export class UserService {
    constructor(private repo: UserRepository) { }

    async register(input: { name?: string; email: string; password: string }): Promise<{ id?: string; name?: string; email: string } | undefined> {
        const existing = await this.repo.findByEmail(input.email);
        if (existing)
            return undefined;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(input.password, salt);

        const user = new User(input.email, hashedPassword, input.name);
        const created = await this.repo.add(user);

        return created && { id: created.id, name: created.name, email: created.email };
    }

    async login(input: { email: string; password: string }): Promise<string | undefined> {
        const user = await this.repo.findByEmail(input.email);
        if (!user)
            return undefined;

        const matches = await bcrypt.compare(input.password, user.password);
        if (!matches)
            return undefined;

        return jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }
}
