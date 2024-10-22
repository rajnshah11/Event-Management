import { graphqlRequest } from "../graphqlClient.js";

export const loginUser = async (email, password) => {
    const mutation = `
        mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                userId
                token
                tokenExpiration
            }
        }
    `;
    const variables = { email, password };
    const resData = await graphqlRequest(mutation, variables);
    return resData.data.login;
};

export const signUpUser = async (email, password) => {
    const mutation = `
        mutation CreateUser($userInput: UserInput!) {
            createUser(userInput: $userInput) {
                _id
                email
            }
        }
    `;
    const variables = { userInput: { email, password } };
    const resData = await graphqlRequest(mutation, variables);
    return resData.data.createUser;
};
