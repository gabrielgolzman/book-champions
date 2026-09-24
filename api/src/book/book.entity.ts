import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/postgresql";
import { Author } from "../author/author.entity.js";

export class Book {
    constructor(
        public title: string,
        public authors: string[],
        public publisher: string,
        public pageCount: number,
        public rating: number,
        public cover: string,
        public isAvailable: boolean,
        public id?: string,
    ) { }
}

@Entity({ tableName: "books" })
export class BookEntity {

    @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
    id?: string;

    @Property({ type: "text" })
    title!: string;

    @Property({ type: "text", nullable: true })
    publisher?: string;

    @Property({ type: "integer", fieldName: "page_count", nullable: true })
    pageCount?: number;

    @Property({ type: "decimal", precision: 2, scale: 1, nullable: true })
    rating?: string;

    @Property({ type: "text", nullable: true })
    cover?: string;

    @Property({ type: "boolean", fieldName: "is_available", nullable: true })
    isAvailable?: boolean;

    @ManyToMany(() => Author, undefined, {
        pivotTable: "book_authors",
        joinColumn: "book_id",
        inverseJoinColumn: "author_id",
    })
    authors = new Collection<Author>(this);
}
