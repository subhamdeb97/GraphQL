import { GraphQLServer } from "graphql-yoga"


// database demo
const users = [
    {
        id:'123subham',
        name: 'Subham',
        email:'subham@gmail.com',
        age: 27
    },
    {
        id:'123babai',
        name: 'Babai',
        email:'babai@gmail.com',
        age: 27
    },
    {
        id:'123deb',
        name: 'Deb',
        email:'deb@gmail.com',
        age: 27
    }
]

const posts = [
    {
        id: '10post',
        title: 'GraphQL 101',
        body: 'this is graphQL 101',
        published: true,
        author: '123subham'
    },
    {
        id: '11post',
        title: 'GraphQL 111',
        body: 'this is graphQL 111',
        published: true,
        author: '123babai'
    },
    {
        id: '12post',
        title: 'GraphQL 112',
        body: 'this is graphQL 112',
        published: true,
        author: '123deb'
    }
]




const typeDefs = `
    type Query{
        users(query: String!): [User!]!
        posts(query: String!): [Post!]!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }
    type Post{
         id: String!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
`

const resolvers = {
    Query:{
        users(parent, argument, ctx, info) {
            if(!argument.query){
                return users
            }
            return users.filter(each=>{
               return each.name.toLowerCase().includes(argument.query.toLowerCase())
            })
        },
        posts(parent, argument, ctx, info){
            if(!argument.query){
                return posts
            }
            return posts.filter(each=>{
               return each.title.toLowerCase().includes(argument.query.toLowerCase())
            })
        }
    },
    Post:{
        author(parent, argument, ctx, info){
            return users.find(each=> each.id == parent.author)
        }
    },
    User:{
        posts(parent, argument, ctx, info){
           return posts.filter(each=> each.author == parent.id)
        }
    }
        
}

let server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('server running on')
})