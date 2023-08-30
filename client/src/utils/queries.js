import { gql } from "apollo-server-express";

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
