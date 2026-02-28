import { gql } from "graphql-request";

export const TRANSACTIONS_QUERY = gql`
  query Transactions($filters: TransactionFiltersInput) {
    transactions(filters: $filters) {
      transactions {
        id
        description
        amount
        type
        date
        categoryId
        category {
          id
          title
          icon
          color
        }
        createdAt
      }
      total
      page
      totalPages
    }
  }
`;

export const TRANSACTION_QUERY = gql`
  query Transaction($id: String!) {
    transaction(id: $id) {
      id
      description
      amount
      type
      date
      categoryId
      category {
        id
        title
        icon
        color
      }
    }
  }
`;
