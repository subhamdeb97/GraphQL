import { GraphQLServer } from "graphql-yoga"

//custom file import

import {customDataType} from "./customDataType"

// type defination Schema
const typeDefs = `
    type Query{
        hello: String
        sayMyName: String!
        me : User!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
    }

`

// *** We use ! after type (ex- hello: String!) to make sure return never be null, always string
// Resolvers

const resolvers = {
    Query : {
        hello(){
            return null
        },
        sayMyName(){
            return "My name is Subham"
        },
        me(){
            return {
                id: '543543',
                name: "Subham Deb",
                email: "Subham.Deb.1253@gmail.com",
                age: 27
            }
        }
    }
}


const server = new GraphQLServer({
        typeDefs,
        // customDataType,
        resolvers
    })

server.start((e)=>{
    console.log(`server started at: ${e}`)
})

// types of datatype in GraphQL