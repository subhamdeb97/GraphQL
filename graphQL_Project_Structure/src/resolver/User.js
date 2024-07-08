const User = {
    posts(parent, argument, {db}, info){
       return db.posts.filter(each=> each.author == parent.id)
    }
}

export default User;