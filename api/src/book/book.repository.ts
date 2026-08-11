import { ObjectId } from "mongodb";
import { Repository } from "../shared/base.repository.js";
import { db } from "../shared/db/conn.js";
import { Book } from "./book.entity.js";
import { BOOKS_MOCK } from "./book.mock.js";

const books = db.collection<Book>('books');

export class BookRepository implements Repository<Book> {

    public async findAll(): Promise<Book[] | undefined> {
        return await books.find().toArray();
    }

    public async findOne(item: { id: string; }): Promise<Book | undefined> {
        const _id = new ObjectId(item.id);
        return await books.findOne({ _id }) || undefined;
    }

    public async add(item: Book): Promise<Book | undefined> {
        item._id = (await books.insertOne(item)).insertedId
        return item;
    }

    public async update(item: Book): Promise<Book | undefined> {
        const { id, ...bookInput } = item;
        const _id = new ObjectId(id)
        return await books.findOneAndUpdate({ _id }, { $set: bookInput }, { returnDocument: 'after' }) || undefined;
    }

    public async delete(item: { id: string; }): Promise<{ id: string } | undefined> {
        const _id = new ObjectId(item.id);
        return await books.findOneAndDelete({ _id }) || undefined;
    }

}