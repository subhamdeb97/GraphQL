const customDataType = `
    type Query{
        me: User!
    }
    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
    }
`



export { customDataType }