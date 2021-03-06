import { Arg, Query, Mutation, Resolver, Authorized } from "type-graphql";
import Tweet from "../schemas/Tweet";
import mongoTweet from '../database/schemas/Tweet';

@Resolver(Tweet)
class TweetController {

    @Query(returns => [Tweet], { name: 'tweets' })
    @Authorized()
    async find() {
        const tweets = await mongoTweet.find();
        return tweets;
    }

    @Mutation(returns => Tweet, { name: 'createTweets' })
    @Authorized()
    async create(
        @Arg("author") author: string,
        @Arg("description") description: string
    ) {
        const tweet = await mongoTweet.create({
            author,
            description,
            likes: 0
        });

        return tweet;
    }

    @Mutation(returns => Tweet, { name: "likedTweet" })
    @Authorized()
    async likedTweet(
        @Arg("id") id: string
    ) {
        const tweet = await mongoTweet.findById(id);

        if(!tweet){
            throw new Error('Tweet does not exists');
        }

        tweet.set({ likes: tweet?.likes + 1 });

        await tweet.save();

        return tweet;
    }

    @Mutation(returns => Tweet, { name: "dislikedTweet" })
    @Authorized()
    async dislikedTweet(
        @Arg("id") id: string
    ) {
        const tweet = await mongoTweet.findById(id);

        if(!tweet){
            throw new Error('Tweet does not exists');
        }

        if(tweet.likes > 0) {
            tweet.set({ likes: tweet?.likes - 1 });

            await tweet.save();
        }        

        return tweet;
    }

}

export default TweetController;