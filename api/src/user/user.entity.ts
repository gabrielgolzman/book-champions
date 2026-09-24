import { Entity, PrimaryKey, Property } from "@mikro-orm/postgresql";

@Entity({ tableName: "users" })
export class User {

    @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
    id?: string;

    @Property({ type: "text", nullable: true })
    name?: string;

    @Property({ type: "text", unique: true })
    email: string;

    @Property({ type: "text" })
    password: string;

    constructor(email: string, password: string, name?: string, id?: string) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.id = id;
    }
}
