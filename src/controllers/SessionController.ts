import { Arg, Mutation, Resolver } from "type-graphql";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import mongoUser from '../database/schemas/User';
import Auth from "../schemas/Auth";
import authConfig from '../config/auth';



@Resolver(Auth)
class SessionController {

    @Mutation(returns => Auth, { name: 'signIn' })
    async signIn(
        @Arg('email') email: string,
        @Arg('password') password: string,
    ) {
        const user = await mongoUser.findOne({ email });

        if(!user) {
            throw new Error("Incorrect email/password combination");            
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new Error("Incorrect email/password combination");            
        }

        const { secret, expiresIn } = authConfig.jwt;

        if(!secret) {
            throw new Error("Server error, try again");
        }

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        });

        return {
            token,
            user
        };
    }


}

export default SessionController;