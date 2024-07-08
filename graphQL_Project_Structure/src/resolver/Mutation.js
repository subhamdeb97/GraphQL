import {v4 as uuid4} from 'uuid'

const Mutation = {
    createUser(parent, argument, {db, pubsub}, info){
        
        const emailTaken = db.users.some(each=> each.email == argument.email)
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
        db.users.push(user)
        
        return user
    },
    createPost(parent, argument, {db, pubsub}, info){
        const user = db.users.find(each=> each.id == argument.author)
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
        db.posts.push(post)

        pubsub.publish(`post`, {
            post: {
                mutation: 'CREATED',
                data: post
            } 
        })
        return post
    },
    createComment(parent, argument, {db, pubsub}, info){
        const post = db.posts.find(each=> each.id == argument.postId)
        if(!post){
            throw new Error('Post not found')
            
        }
        const comment = {
                id: uuid4(),
                userId: argument.userId,
                postId: post.id,
                body: argument.body
            }
        db.comments.push(comment)
        pubsub.publish(`comment ${argument.postId}`, {comment: comment})
        return comment

    },
    createUserWithInputType(parent, argument, {db}, info){
        const emailTaken = db.users.some(each=> each.email == argument.data.email)
        if(emailTaken){
            throw new Error('Email id is already taken')
        }

        console.log(argument.data)
        const user = {
            id: uuid4(),
            ...argument.data
        }
        db.users.push(user)
        return user
    },
    deleteComment(parenr, arg, {db}, info){
        const thePost = db.posts.find(each=> each.id === arg.postId)
        if(!thePost){
            throw new Error('post not found')
        }
        const findCommmnet = db.comments.find(each=> each.id === arg.commentId && thePost.id === arg.postId)
        if(!findCommmnet){
            throw new Error('comment not found')
        }

        return 'delete'

    }
}

export default Mutation;