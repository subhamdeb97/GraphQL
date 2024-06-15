// import { message1 } from "./myModule"
// const {message2} =  require('./myModule')

// console.log(message1)
// console.log(message2)

import { GraphQLServer } from "graphql-yoga"

// type defination (Schema)
const typeDefs = `
    type Query{
       title: String!
       price: Float!
       releaseYear: Int
       rating: Float
       inSTock: Boolean!
       me: User!
       greeting(name: String): String!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
    }
`

//Resolver
const resolvers = {
    Query: {
        title(){
            return 'Product title'
        },
        price(){
            return 110.88
        },
        releaseYear(){
            return 2024
        },
        rating(){
            return 8.3
        },
        inSTock(){
            return true
        },
        me(){
           return {
            id: '123ABC',
            name: 'Subham Deb',
            email: 'subham.deb.1253@gmail.com'
           } 
        },
        greeting(parent, argument, ctx, info){
            return `Hello! ${argument.name}`
        }
    }
}

let server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(()=>{
    console.log('the server is running up!')
})

