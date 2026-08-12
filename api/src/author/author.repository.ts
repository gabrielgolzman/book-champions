import { validate as isValidUUID } from 'uuid';
import { Repository } from "../shared/base.repository.js";
import { Author } from "./author.entity.js";
import { pool } from "../shared/db/conn.postgre.js";

export class AuthorRepository implements Repository<Author> {

    public async findAll(): Promise<Author[] | undefined> {
        const result = await pool.query('select id, name from authors');
        return result.rows;
    }

    public async findOne(item: { id: string; }): Promise<Author | undefined> {
        if (!isValidUUID(item.id))
            return undefined;

        const result = (await pool.query(
            'select id, name from authors where id = $1',
            [item.id]
        )).rows[0];

        if (!result)
            return undefined;

        return result;
    }

    public async add(item: Author): Promise<Author | undefined> {
        const result = (await pool.query(
            'insert into authors (name) values ($1) returning id, name',
            [item.name]
        )).rows[0];

        return result;
    }

    public async update(item: Author): Promise<Author | undefined> {
        if (!item.id || !isValidUUID(item.id))
            return undefined;

        const result = (await pool.query(
            'update authors set name = $1 where id = $2 returning id, name',
            [item.name, item.id]
        )).rows[0];

        return result;
    }

    public async delete(item: { id: string; }): Promise<{ id: string } | undefined> {
        if (!isValidUUID(item.id))
            return undefined;

        const result = (await pool.query(
            'delete from authors where id = $1 returning id',
            [item.id]
        )).rows[0];

        return result;
    }

}
