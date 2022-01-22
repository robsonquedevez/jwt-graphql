import { Field, ObjectType, ID } from 'type-graphql';
import { IUser } from '../database/schemas/User';

@ObjectType()
class User implements IUser {

    @Field(type => ID, { nullable: true })
    _id: any;

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    password: string;

    @Field({ nullable: true })
    createdAt: Date;

    @Field({ nullable: true })
    updatedAt: Date;
}

export default User;
