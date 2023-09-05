import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        token
            _id
            username
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
mutation saveBook($bookId: String!, $author: String, $description: String, $title: String, $image: String, $link: String) {
    saveBook(author: $author, title: $title, description: $description, bookId: $bookId, image: $image, link: $link) {
            _id
            username
        }
}`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
    }
}
`;



