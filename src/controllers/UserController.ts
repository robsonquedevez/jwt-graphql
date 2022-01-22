import { Arg, Mutation, Query, Resolver } from "type-graphql";
import User from "../schemas/User";
import mongoUser from '../database/schemas/User';
import { hash } from 'bcrypt';


@Resolver(User)
class UserController {

    @Query(returns => [User], { name: 'users' })
    async find() {
        const users = await mongoUser.find().select([
            '_id',
            'name',
            'email',
            'createdAt',
            'updatedAt'
        ]);

        return users;
    }

    @Query(returns => User, { name: 'user' })
    async findById(
        @Arg('id') id: string
    ) {
        const user = await mongoUser.findById(id);

        if(!user){
            throw new Error('User does not exists');
        }

        return user;
    }

    @Mutation(returns => User, { name: 'createUser' })
    async create(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
    ) {
        const hashPassword = await hash(password, 8);

        const user = await mongoUser.create({
            name,
            email,
            password: hashPassword
        });

        return user;
    }


}

export default UserController;