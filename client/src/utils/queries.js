import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
    me {
        username
        password
        email
        bookCount
        _id
        savedBooks {
          title
          image
          description
          bookId
          authors
        }
      }
    }
`;
