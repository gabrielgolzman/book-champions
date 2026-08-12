import { Repository } from "../shared/base.repository.js";
import { Author } from "./author.entity.js";

export class AuthorService {
    constructor(private repo: Repository<Author>) { }

    findAll(): Promise<Author[] | undefined> {
        return this.repo.findAll();
    }

    findOne(id: string): Promise<Author | undefined> {
        return this.repo.findOne({ id });
    }

    create(input: Omit<Author, "id">): Promise<Author | undefined> {
        const author = new Author(
            input.name,
        );

        return this.repo.add(author);
    }

    update(id: string, input: Partial<Author>): Promise<Author | undefined> {
        return this.repo.update({ id, ...input } as Author);
    }

    remove(id: string): Promise<{ id: string } | undefined> {
        return this.repo.delete({ id });
    }
}
