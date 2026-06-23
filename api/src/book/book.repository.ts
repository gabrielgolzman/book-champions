import { Repository } from "../shared/base.repository.js";
import { Book } from "./book.js";
import { BOOKS_MOCK } from "./book.mock.js";

export class BookRepository implements Repository<Book> {

    public findAll(): Book[] | undefined {
        return BOOKS_MOCK;
    }

    public findOne(item: { id: string; }): Book | undefined {
        return BOOKS_MOCK.find((book) => book.id === item.id);
    }

    public add(item: Book): Book | undefined {
        BOOKS_MOCK.push(item);
        return item;
    }

    public update(item: Book): Book | undefined {
        const bookIndex = BOOKS_MOCK.findIndex(book => book.id === item.id);

        if (bookIndex >= 0) {
            BOOKS_MOCK[bookIndex] = { ...BOOKS_MOCK[bookIndex], ...item }
        }

        return BOOKS_MOCK[bookIndex];
    }

    public delete(item: { id: string; }): { id: string } | undefined {
        const bookIndex = BOOKS_MOCK.findIndex((book) => book.id === item.id);

        if (bookIndex >= 0) {
            BOOKS_MOCK.splice(bookIndex, 1);
        }

        return { id: item.id }

    }

}