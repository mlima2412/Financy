import { gql } from "graphql-request";

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      categories {
        id
        title
        description
        icon
        color
        transactionCount
        totalValue
        createdAt
      }
      totalCategories
      totalTransactions
      mostUsedCategory
    }
  }
`;

export const CATEGORY_QUERY = gql`
  query Category($id: String!) {
    category(id: $id) {
      id
      title
      description
      icon
      color
    }
  }
`;
