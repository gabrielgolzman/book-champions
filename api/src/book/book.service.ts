import { Repository } from "../shared/base.repository.js";
import { Book } from "./book.entity.js";

export class BookService {
    constructor(private repo: Repository<Book>) { }

    findAll(): Book[] | undefined {
        return this.repo.findAll();
    }

    findOne(id: string): Book | undefined {
        return this.repo.findOne({ id });
    }

    create(input: Omit<Book, "id">): Book {
        const book = new Book(
            input.title,
            input.authors,
            input.publisher,
            input.pageCount,
            input.rating,
            input.cover,
            input.isAvailable,
        );
        this.repo.add(book);
        return book;
    }

    update(id: string, input: Partial<Book>): Book | undefined {
        return this.repo.update({ id, ...input } as Book);
    }

    remove(id: string): { id: string } | undefined {
        return this.repo.delete({ id });
    }
}
