import { buildSchema } from 'type-graphql';

import Tweet from './Tweet';
import TweetController from '../controllers/TweetController';
import User from './User';
import UserController from '../controllers/UserController';
import Auth from './Auth';
import SessionController from '../controllers/SessionController';

import EnsureAutheticate from '../middlewares/EnsureAuthenticate';

const schema = async () => await buildSchema({
    resolvers: [
        Tweet, 
        TweetController,
        User, 
        UserController,
        Auth,
        SessionController
    ],
    authChecker: EnsureAutheticate
});

export default schema;