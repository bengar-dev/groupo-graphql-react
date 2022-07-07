import { request, gql } from 'graphql-request'
import { GRAPHQL_URL } from './CONST'

export const createUser = async (email, firstname, lastname, password) => {

    const mutation = gql`
    
    mutation CreateUserMutation($email: String!, $firstname: String!, $lastname: String!, $password: String!) {

        createUser(
            email: $email,
            firstname: $firstname,
            lastname: $lastname,
            password: $password
        ) {
            id
            email
            firstname
            lastname
        }

    }
    `

    const variables = { email, firstname, lastname, password }
    const { createUser } = await request(GRAPHQL_URL, mutation, variables)

    return createUser

}

export const signInUser = async (email, password) => {


    const mutation = gql`
    
        mutation SignInUserMutation($email: String!, $password: String!) {

            signInUser(
                email: $email,
                password: $password
            )  {
                token
                userId
            }

        }
    
    `

    const variables = { email, password }
    const { signInUser } = await request(GRAPHQL_URL, mutation, variables)

    return signInUser

}

export const editUser = async (id, email, firstname, lastname) => {


    const mutation = gql`
    
        mutation EditOneUserMutation($id: ID!, $email: String!, $firstname: String!, $lastname: String!) {

            editUser(
                id: $id,
                email: $email,
                firstname: $firstname,
                lastname: $lastname
            ) {
                email
                firstname
                lastname
            }

        }
    
    `

    const variables = { id, email, firstname, lastname }
    const { editUser } = await request(GRAPHQL_URL, mutation, variables)

    return editUser

}
