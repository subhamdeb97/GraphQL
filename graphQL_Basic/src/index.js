// import { message1 } from "./myModule"
// const {message2} =  require('./myModule')

// console.log(message1)
// console.log(message2)

import { GraphQLServer } from "graphql-yoga"


const demoUsers = [
    {
        id: '125354',
        name: 'Subham',
        email: 'subhamdeb@gmail.com',
        age: '27'
    },
    {
        id: '52145',
        name: 'babai',
        email: 'babaideb@gmail.com',
        age: '27'
    },
    {
        id: '125354',
        name: 'subai',
        email: 'subaideb@gmail.com',
        age: '27'
    }

    ]

// type defination (Schema)
const typeDefs = `
    type Query{
       title: String!
       price: Float!
       releaseYear: Int
       rating: Float
       inSTock: Boolean!
       me: User!
       greeting(name: String, teaching: String): String!
       add(a: Float!, b: Float!): Float!
       addArray(numbers: [Int]!) : Int!

       usersList(id: String!): [User]
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
            return `Hello! ${argument.name} and teaching: ${argument.teaching}`
        },
        add(parent, arg, ctx, info){
            return arg.a + arg.b;
        },
        addArray(parent, args, ctx, info){
            let total = 0
            if(args.numbers.length < 1){
                return []
            }
            else{
                for(let x=0; args.numbers.length > x ; x++){
                    total += args.numbers[x]
                }
            }   
            return total
        },
        usersList(parent, args, ctx, info){
            // let searchId = args.id
            // let user = null;
            // for(let x in demoUsers){
            //     if(demoUsers[x].id == searchId){
            //         user = demoUsers[x]
            //     }
            // }
            return demoUsers.filter(user => {
                return user.id == args.id
            });
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

