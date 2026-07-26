import { Repository } from "../shared/base.repository.js";
import { Book } from "./book.entity.js";

export class BookService {
    constructor(private repo: Repository<Book>) { }

    findAll(): Promise<Book[] | undefined> {
        return this.repo.findAll();
    }

    findOne(id: string): Promise<Book | undefined> {
        return this.repo.findOne({ id });
    }

    create(input: Omit<Book, "id">): Promise<Book | undefined> {
        const book = new Book(
            input.title,
            input.authors,
            input.publisher,
            input.pageCount,
            input.rating,
            input.cover,
            input.isAvailable,
        );

        return this.repo.add(book);
    }

    update(id: string, input: Partial<Book>): Promise<Book | undefined> {
        return this.repo.update({ id, ...input } as Book);
    }

    remove(id: string): Promise<{ id: string } | undefined> {
        return this.repo.delete({ id });
    }
}
