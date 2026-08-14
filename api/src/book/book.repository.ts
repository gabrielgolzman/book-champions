import { validate as isValidUUID } from 'uuid';
import { Repository } from "../shared/base.repository.js";
import { Book } from "./book.entity.js";
import { pool } from "../shared/db/conn.postgre.js";

const bookAuthorsQuery = `select
                b.id,
                b.title,
                b.publisher,
                b.page_count as "pageCount",
                b.rating,
                b.cover,
                b.is_available as "isAvailable",
                string_agg(a.name, ', ') as authors
            from books b
            left join book_authors ba on ba.book_id = b.id
            left join authors a on a.id = ba.author_id`;
export class BookRepository implements Repository<Book> {



    public async findAll(): Promise<Book[] | undefined> {
        const result = await pool.query(`${bookAuthorsQuery}  group by b.id`)
        return result.rows.map(row => ({
            ...row,
            authors: row.authors ? row.authors.split(', ') : [],
        }))
    }

    public async findOne(item: { id: string; }): Promise<Book | undefined> {
        if (!isValidUUID(item.id))
            return undefined;

        const result = (await pool.query(`${bookAuthorsQuery}
            where b.id = $1
            group by b.id
            `, [item.id])).rows[0];

        if (!result)
            return undefined;

        return {
            ...result,
            authors: result.authors ? result.authors.split(', ') : [],
        };

    }

    public async add(item: Book): Promise<Book | undefined> {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const book = (await client.query(
                `insert into books (title, publisher, page_count, rating, cover, is_available)
                 values ($1, $2, $3, $4, $5, $6)
                 returning id, title, publisher, page_count as "pageCount", rating, cover, is_available as "isAvailable"`,
                [item.title, item.publisher, item.pageCount, item.rating, item.cover, item.isAvailable]
            )).rows[0];

            console.log(book);

            for (const name of item.authors) {
                const author = (await client.query(
                    `insert into authors (name) values ($1)
                     on conflict (name) do update set name = excluded.name
                     returning id`,
                    [name]
                )).rows[0];

                await client.query(
                    'insert into book_authors (book_id, author_id) values ($1, $2)',
                    [book.id, author.id]
                );
            }

            await client.query('COMMIT');
            return { ...book, authors: item.authors };
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    public async update(item: Book): Promise<Book | undefined> {
        if (!item.id || !isValidUUID(item.id) || !item.authors)
            return undefined;

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const book = (await client.query(
                `update books
                 set title = $1, publisher = $2, page_count = $3, rating = $4, cover = $5, is_available = $6
                 where id = $7
                 returning id, title, publisher, page_count as "pageCount", rating, cover, is_available as "isAvailable"`,
                [item.title, item.publisher, item.pageCount, item.rating, item.cover, item.isAvailable, item.id]
            )).rows[0];

            if (!book) {
                await client.query('ROLLBACK');
                return undefined;
            }

            await client.query('delete from book_authors where book_id = $1', [book.id]);

            for (const name of item.authors) {
                const author = (await client.query(
                    `insert into authors (name) values ($1)
                     on conflict (name) do update set name = excluded.name
                     returning id`,
                    [name]
                )).rows[0];

                await client.query(
                    'insert into book_authors (book_id, author_id) values ($1, $2)',
                    [book.id, author.id]
                );
            }

            await client.query('COMMIT');
            return { ...book, authors: item.authors };
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    public async delete(item: { id: string; }): Promise<{ id: string } | undefined> {
        if (!isValidUUID(item.id))
            return undefined;

        const result = (await pool.query(
            'delete from books where id = $1 returning id',
            [item.id]
        )).rows[0];

        return result;
    }

}