import { Entity, PrimaryKey, Property } from "@mikro-orm/postgresql";

@Entity({ tableName: "authors" })
export class Author {

    @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
    id?: string;

    @Property({ type: "text", unique: true })
    name: string;

    constructor(name: string, id?: string) {
        this.name = name;
        this.id = id;
    }
}
