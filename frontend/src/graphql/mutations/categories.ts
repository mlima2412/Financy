import { gql } from "graphql-request";

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id
      title
      description
      icon
      color
    }
  }
`;

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($id: String!, $data: UpdateCategoryInput!) {
    updateCategory(id: $id, data: $data) {
      id
      title
      description
      icon
      color
    }
  }
`;

export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id)
  }
`;
