const { gql }= require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
}
input BookInput {
    authors: [String]
    description: String
    bookId: String!
    image: String
    title: String!
}
type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
}
type Auth {
    token: ID!
    user: User
}
type Query {
    everyone: [User]!
   me: User
}
type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth

    saveBook(bookData: BookInput): User
     
    removeBook(bookId: String): User
}
`;
module.exports = typeDefs;