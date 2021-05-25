import {bind, BindingScope} from '@loopback/core';
import {User} from "../models";
import {AnyObject, DataObject, DefaultCrudRepository, Filter, Options} from "@loopback/repository";
import {PostgresDataSource} from "../datasources";

@bind({scope: BindingScope.SINGLETON})
export class UserService {
    repos: AnyObject = {};

    constructor() {
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
        if (!this.repos[schema]) {
            const ds = new PostgresDataSource({
                connector: 'postgresql',
                host: 'localhost',
                port: '5432',
                user: 'postgres',
                password: 'mypassword',
                database: 'test',
                schema: schema,
            });
            this.repos[schema] = new DefaultCrudRepository(User, ds);
        }
        return this.repos[schema]
    }
}
