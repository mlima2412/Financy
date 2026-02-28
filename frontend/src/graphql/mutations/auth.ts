import { gql } from "graphql-request";

export const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      refreshToken
      user {
        id
        name
        email
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      token
      refreshToken
      user {
        id
        name
        email
      }
    }
  }
`;
