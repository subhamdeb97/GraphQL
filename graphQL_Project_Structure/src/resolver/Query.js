const Query =  {
    users(parent, argument, {db}, info) {
        if(!argument.query){
            return db.users
        }
        return db.users.filter(each=>{
           return each.name.toLowerCase().includes(argument.query.toLowerCase())
        })
    },
    posts(parent, argument, {db}, info){
        if(!argument.query){
            return db.posts
        }
        return db.posts.filter(each=>{
           return each.title.toLowerCase().includes(argument.query.toLowerCase())
        })
    },
    comments(parenr, argument, {db}, info){
        return db.comments;
    }
}

export default Query;