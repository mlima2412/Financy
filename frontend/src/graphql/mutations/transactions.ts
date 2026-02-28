import { gql } from "graphql-request";

export const CREATE_TRANSACTION_MUTATION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
      description
      amount
      type
      date
      categoryId
    }
  }
`;

export const UPDATE_TRANSACTION_MUTATION = gql`
  mutation UpdateTransaction($id: String!, $data: UpdateTransactionInput!) {
    updateTransaction(id: $id, data: $data) {
      id
      description
      amount
      type
      date
      categoryId
    }
  }
`;

export const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`;
