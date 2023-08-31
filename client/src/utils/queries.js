import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
    user {
            _id: ID
            username: String
            email: String
            password: String
            thoughts: [Thought]!
    }
    }
}
`;
