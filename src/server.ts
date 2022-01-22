import 'reflect-metadata';
import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import './database';
import './database/schemas/Tweet';
import './database/schemas/User';

import schemaFn from './schemas';

const app = async () => {
    const schema = await schemaFn();

    const server = new ApolloServer({ 
        schema,
        context: ({ req }) => {
            const context = {
                req,
                token: req.headers.authorization
            }

            return context;
        }
    });

    server.listen( {port: 4000}, () => { console.log(`Server Running in port 4000`) });
}

app();