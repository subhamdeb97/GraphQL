import { GraphQLServer } from "graphql-yoga"
import {v4 as uuid4} from 'uuid'

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

const comments = [

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
        comments: [Comment!]!
    }
    type Comment{
        id: ID!,
        userId: ID!
        postId: ID!
        body: String!
    }
    type Mutation{
        createUser(name: String!, email:String!, age: Int) : User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(postId: ID!, userId: ID!, body: String!): Comment!
        createUserWithInputType(data: CreateUserInput): User!
        deleteComment(commentId: String!, postId: String!): String! 
    }
    
    input CreateUserInput{
        name: String!
        email: String!
        age: Int
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
        },
        comments(parent, argument, ctx, info){
            return comments.filter(each=> each.postId == parent.id)
        }
    },
    User:{
        posts(parent, argument, ctx, info){
           return posts.filter(each=> each.author == parent.id)
        }
    },
    Mutation: {
        createUser(parent, argument, ctx, info){
            
            const emailTaken = users.some(each=> each.email == argument.email)
            if(emailTaken){
                throw new Error('Email id is already taken')
            }

            console.log(argument)
            const user = {
                id: uuid4(),
                name: argument.name,
                email: argument.email,
                age: argument.age,
            }
            users.push(user)
            return user
        },
        createPost(parent, argument, ctx, info){
            const user = users.find(each=> each.id == argument.author)
            if(!user){
                throw new Error('User not found')
            }
            const post = {
                id: uuid4(),
                title: argument.title,
                body: argument.body,
                published: argument.published,
                author: user.id
            }
            posts.push(post)
            return post
        },
        createComment(parent, argument, ctx, info){
            const post = posts.find(each=> each.id == argument.postId)
            if(!post){
                throw new Error('Post not found')
                
            }
            const comment = {
                    id: uuid4(),
                    userId: argument.userId,
                    postId: post.id,
                    body: argument.body
                }
            comments.push(comment)
            return comment

        },
        createUserWithInputType(parent, argument, ctx, info){
            const emailTaken = users.some(each=> each.email == argument.data.email)
            if(emailTaken){
                throw new Error('Email id is already taken')
            }

            console.log(argument.data)
            const user = {
                id: uuid4(),
                ...argument.data
            }
            users.push(user)
            return user
        },
        deleteComment(parenr, arg, ctx, info){
            const thePost = posts.find(each=> each.id === arg.postId)
            if(!thePost){
                throw new Error('post not found')
            }
            const findCommmnet = comments.find(each=> each.id === arg.commentId && thePost.id === arg.postId)
            if(!findCommmnet){
                throw new Error('comment not found')
            }

            return 'delete'

        }
    }
        
}

let server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    const a = {name: "Subham"}
    const b = {age: 27, ...a}
    console.log('server running on::', b)
})
