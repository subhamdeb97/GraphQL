const Subscription = {
    count:{
        subscribe(parent, arg, {pubsub}, info){
            let count = 0
            setInterval(()=>{
                count++
                pubsub.publish('count', {
                    count : count
                })
            }, 1000)

            return pubsub.asyncIterator('count')
        }
    },
    comment: {
        subscribe(parent, { postId }, {db, pubsub}, info){
            console.log('post Id: ', postId,  db.posts)
            const post = db.posts.find(eachPost => postId === eachPost.id && eachPost.published)

            if(!post){
                throw new Error ("Post not found")
            }

            return pubsub.asyncIterator(`comment ${postId}`)
        }
    },
    post:{
        subscribe(parent, args, {db, pubsub}, info){
            return pubsub.asyncIterator(`post`)
        }
    }
}


export default Subscription;