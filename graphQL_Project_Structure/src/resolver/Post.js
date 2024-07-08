const Post = {
    author(parent, argument, {db}, info){
        return db.users.find(each=> each.id == parent.author)
    },
    comments(parent, argument, {db}, info){
        return db.comments.filter(each=> each.postId == parent.id)
    }
}


export default Post