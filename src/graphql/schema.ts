import { buildSchema } from "graphql";

export = buildSchema(`
    input CreateRegisterDTO {
        userId: ID!        
        username: String!
        email: String!
        walletAddress: String!
    }

    type RegisterData {
        userId: ID!
        username: String!
        email: String!
        walletAddress: String!
    }

    type RegisterResponse {
        username: String!
        result: Boolean!
        msg: String
    }

    type RootQuery {
        getAllRegister: [RegisterData]
        getRegisterByUserId(userId: String!): RegisterData
    }

    type RootMutation {
        createRegister(input: CreateRegisterDTO): RegisterResponse!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
