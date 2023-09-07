import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            email
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token   
        user {
            _id
            username
        }
    }
}`;  

export const SAVE_BOOK = gql`
mutation saveBook($bookData: bookData!) {
    saveBook(bookData: $bookData) {
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
        }
}`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
    }
}
`;



