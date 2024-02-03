import { GraphQLServer } from "graphql-yoga"


// type defination Schema
const typeDefs = `
    type Query{
        hello: String!,
        sayMyName: String!
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
        }
    }
}


const server = new GraphQLServer({
        typeDefs,
        resolvers
    })

server.start((e)=>{
    console.log(`server started at: ${e}`)
})

// types of datatype in GraphQL