import { validate as isValidUUID } from 'uuid';
import { Repository } from "../shared/base.repository.js";
import { Book, BookEntity } from "./book.entity.js";
import { Author } from "../author/author.entity.js";
import { orm } from "../shared/db/orm.js";

function toBook(entity: BookEntity): Book {
    return {
        id: entity.id,
        title: entity.title,
        publisher: entity.publisher,
        pageCount: entity.pageCount,
        rating: entity.rating,
        cover: entity.cover,
        isAvailable: entity.isAvailable,
        authors: entity.authors.getItems().map(author => author.name),
    } as unknown as Book;
}

export class BookRepository implements Repository<Book> {

    public async findAll(): Promise<Book[] | undefined> {
        const em = orm.em.fork();
        const books = await em.find(BookEntity, {}, { populate: ['authors'] });
        return books.map(toBook);
    }

    public async findOne(item: { id: string; }): Promise<Book | undefined> {
        if (!isValidUUID(item.id))
            return undefined;

        const em = orm.em.fork();
        const book = await em.findOne(BookEntity, { id: item.id }, { populate: ['authors'] });
        if (!book)
            return undefined;

        return toBook(book);
    }

    public async add(item: Book): Promise<Book | undefined> {
        return await orm.em.fork().transactional(async (em) => {
            const book = new BookEntity();
            book.title = item.title;
            book.publisher = item.publisher;
            book.pageCount = item.pageCount;
            book.rating = String(item.rating);
            book.cover = item.cover;
            book.isAvailable = item.isAvailable;

            for (const name of item.authors) {
                const author = await em.upsert(Author, { name });
                book.authors.add(author);
            }

            em.persist(book);
            await em.flush();

            return toBook(book);
        });
    }

    public async update(item: Book): Promise<Book | undefined> {
        if (!item.id || !isValidUUID(item.id) || !item.authors)
            return undefined;

        return await orm.em.fork().transactional(async (em) => {
            const book = await em.findOne(BookEntity, { id: item.id }, { populate: ['authors'] });
            if (!book)
                return undefined;

            book.title = item.title;
            book.publisher = item.publisher;
            book.pageCount = item.pageCount;
            book.rating = String(item.rating);
            book.cover = item.cover;
            book.isAvailable = item.isAvailable;

            book.authors.removeAll();

            for (const name of item.authors) {
                const author = await em.upsert(Author, { name });
                book.authors.add(author);
            }

            await em.flush();

            return toBook(book);
        });
    }

    public async delete(item: { id: string; }): Promise<{ id: string } | undefined> {
        if (!isValidUUID(item.id))
            return undefined;

        const em = orm.em.fork();
        const affected = await em.nativeDelete(BookEntity, { id: item.id });
        if (!affected)
            return undefined;

        return { id: item.id };
    }

}
