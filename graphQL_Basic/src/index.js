// import { message1 } from "./myModule"
// const {message2} =  require('./myModule')

// console.log(message1)
// console.log(message2)

import { GraphQLServer } from "graphql-yoga"

// type defination (Schema)
const typeDefs = `
    type Query{
        hello: String!
    }
`

//Resolver
const resolvers = {
    Query: {
        hello(){
            return 'this is my first query!'
        }
    }
}