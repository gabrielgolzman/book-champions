import "reflect-metadata";
import { MikroORM } from "@mikro-orm/postgresql";
import { Author } from "../../author/author.entity.js";
import { BookEntity } from "../../book/book.entity.js";
import { User } from "../../user/user.entity.js";

export const orm = await MikroORM.init({
    entities: [Author, BookEntity, User],
    dbName: process.env.POSTGRES_DB || "postgres",
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "dsw_123!",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
});
