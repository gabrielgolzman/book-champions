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

    }

}