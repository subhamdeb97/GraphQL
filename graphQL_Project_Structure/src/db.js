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
    {
        id: "21comment",
        userId: "123deb",
        postId: "11post",
        body: "hardcoded post in db"
    }
]


const db = {
    users,
    comments,
    posts
}

export {db as default};