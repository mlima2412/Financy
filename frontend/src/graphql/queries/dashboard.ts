import { gql } from "graphql-request";

export const DASHBOARD_QUERY = gql`
  query Dashboard($month: Int, $year: Int) {
    dashboard(month: $month, year: $year) {
      totalBalance
      monthlyIncome
      monthlyExpenses
      recentTransactions {
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
      categories {
        id
        title
        icon
        color
        transactionCount
        totalValue
      }
    }
  }
`;
