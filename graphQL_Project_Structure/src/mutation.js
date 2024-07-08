import { GraphQLServer, PubSub } from "graphql-yoga"
import {v4 as uuid4} from 'uuid'
import db from './db.js'

import Query from './resolver/Query.js'
import Post from './resolver/Post.js'
import User from './resolver/User.js'
import Mutation from './resolver/Mutation.js'
import Comment from './resolver/Comment.js'
import Subscription from "./resolver/Subscription.js"


// database get from other js but their is another way useing context
// const users = db.users

// const posts = db.comments

// const comments = db.comments

const pubsub = new PubSub();

    
let server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    context: {
        db,
        pubsub
    },
    resolvers:{
        Query,
        Mutation,
        User,
        Post,
        Comment,
        Subscription
    }
})

server.start(() => {
    console.log('server running on::', )
})