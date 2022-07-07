import { request, gql } from "graphql-request";
import { GRAPHQL_URL } from "./CONST";

export const getUserInfo = async (id) => {
  const query = gql`
    query GetUserInfoQuery($id: ID!) {
      user(id: $id) {
        id
        email
        firstname
        lastname
        avatar
      }
    }
  `;
  const variables = { id };
  const { user } = await request(GRAPHQL_URL, query, variables);
  return user;
};

export const getUsers = async () => {
  const query = gql`
    query {
      users {
        id
        firstname
        lastname
        avatar
        email
      }
    }
  `;

  const { users } = await request(GRAPHQL_URL, query);
  return users;
};

export const getPosts = async () => {
  const query = gql`
    query {
      posts {
        id
        title
        content
        author {
          id
          firstname
          lastname
          avatar
        }
      }
    }
  `;

  const { posts } = await request(GRAPHQL_URL, query);
  return posts;
};
