import { verify } from "jsonwebtoken";
import { AuthChecker } from "type-graphql";
import auth from '../config/auth';

type Context = {
    token?: string
}

const EnsureAutheticate: AuthChecker<Context>  = ({ context }): boolean => {
    const authHeader = context.token;

    if(!authHeader){
        return false;
    }

    const [, token ] = authHeader.split(' ');

    try {
        const decoded = verify(token, auth.jwt.secret as string);

        return !!decoded;
    } catch {
        return false;
    }
}

export default EnsureAutheticate;