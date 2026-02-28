import { gql } from "graphql-request";

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      name
      email
    }
  }
`;
