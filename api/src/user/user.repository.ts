import { User } from "./user.entity.js";
import { orm } from "../shared/db/orm.js";

export class UserRepository {

    public async findByEmail(email: string): Promise<User | undefined> {
        const em = orm.em.fork();
        return await em.findOne(User, { email }) || undefined;
    }

    public async add(item: User): Promise<User | undefined> {
        const em = orm.em.fork();
        await em.persistAndFlush(item);
        return item;
    }

}
