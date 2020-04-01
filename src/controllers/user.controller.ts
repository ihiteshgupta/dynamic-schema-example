import {Filter,} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody,} from '@loopback/rest';
import {User} from '../models';
import {service} from "@loopback/core";
import {UserService} from "../services";

export class UserController {
    constructor(
        @service(UserService)
        public userService: UserService,
    ) {
    }

    @post('/users', {
        responses: {
            '200': {
                description: 'User model instance',
                content: {'application/json': {schema: getModelSchemaRef(User)}},
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, {
                        title: 'NewUser',
                        exclude: ['id'],
                    }),
                },
            },
        })
            user: Omit<User, 'id'>,
        @param.query.string('schema') schema: string,
    ): Promise<User> {
        return this.userService.create(user, schema);
    }

    @get('/users', {
        responses: {
            '200': {
                description: 'Array of User model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(User, {includeRelations: true}),
                        },
                    },
                },
            },
        },
    })
    async find(
        @param.query.string('schema') schema: string,
        @param.filter(User) filter?: Filter<User>,
    ): Promise<User[]> {
        return this.userService.find(schema,filter);
    }
}
