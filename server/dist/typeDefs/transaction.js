import gql from 'graphql-tag';
const typeDefs = gql `
  type User {
    id: String
    email: String
    password: String
    name: String
    phone: String
    age: String
    role: String
    # array of objects
    rentals: [Rental]
    transactions: [Transaction]
    createdAt: Date
  }

  type Transaction {
    id: String
    verified: Boolean
    user: User
    userId: String
    createdAt: Date
  }

  type IsSuccess {
    success: Boolean
  }

  # QUERIES = GET REQUESTS
  type Query {
    getTransactionById(id: String): Transaction
  }

  type Query {
    getAllTransactions: [Transaction]
  }

  # MUTATIONS = POST or PUT or DELETE REQUESTS
  type Mutation {
    createTransaction(userId: String, verified: Boolean): Transaction
  }
`;
export default typeDefs;
