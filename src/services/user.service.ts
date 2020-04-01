import {bind, BindingScope} from '@loopback/core';
import {User} from "../models";
import {DataObject, DefaultCrudRepository, Filter, Options} from "@loopback/repository";
import {PostgresDataSource} from "../datasources";

@bind({scope: BindingScope.TRANSIENT})
export class UserService {
    constructor(/* Add @inject to inject parameters */) {
    }

    async find(schema: string, filter?: Filter<User>, options?: Options): Promise<User[]> {
        const repo = await this.getRepo(schema);
        return repo.find(filter, options);
    }

    async create(entity: DataObject<User>, schema: string, options?: Options): Promise<User> {
        const repo = await this.getRepo(schema);
        return repo.create(entity, options);
    }

    async getRepo(schema: string) {
        const ds = new PostgresDataSource({
            connector: 'postgresql',
            host: 'localhost',
            port: '5432',
            user: 'hitesh',
            password: '30121993',
            database: 'test',
            schema: schema,
        });
        return new DefaultCrudRepository(User, ds);
    }
}
