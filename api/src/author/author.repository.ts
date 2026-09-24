import { validate as isValidUUID } from 'uuid';
import { Repository } from "../shared/base.repository.js";
import { Author } from "./author.entity.js";
import { orm } from "../shared/db/orm.js";

export class AuthorRepository implements Repository<Author> {

    public async findAll(): Promise<Author[] | undefined> {
        const em = orm.em.fork();
        return em.find(Author, {});
    }

    public async findOne(item: { id: string; }): Promise<Author | undefined> {
        if (!isValidUUID(item.id))
            return undefined;

        const em = orm.em.fork();
        return await em.findOne(Author, { id: item.id }) || undefined;
    }

    public async add(item: Author): Promise<Author | undefined> {
        const em = orm.em.fork();
        const author = new Author(item.name);

        await em.persistAndFlush(author);
        return author;
    }

    public async update(item: Author): Promise<Author | undefined> {
        if (!item.id || !isValidUUID(item.id))
            return undefined;

        const em = orm.em.fork();
        const author = await em.findOne(Author, { id: item.id });
        if (!author)
            return undefined;

        author.name = item.name;
        await em.flush();
        return author;
    }

    public async delete(item: { id: string; }): Promise<{ id: string } | undefined> {
        if (!isValidUUID(item.id))
            return undefined;

        const em = orm.em.fork();
        const affected = await em.nativeDelete(Author, { id: item.id });
        if (!affected)
            return undefined;

        return { id: item.id };
    }

}
