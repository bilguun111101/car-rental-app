import gql from 'graphql-tag';

const typeDefs = gql`
  scalar Date

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
    cars: [Car]
    transactions: [Transaction]
  }

  type Rental {
    id: String
    dateRent: String
    dateReturn: String
    location: String
    verified: Boolean
    user: User
    userId: String
    createdAt: Date
    extras: Extras
  }

  type Extras {
    coverage: Boolean
    child_safety: Boolean
    GPS: Boolean
  }

  type Car {
    id: String
    image: String
    type: String
    typeDefinition: String
    model: String
    transmission: String
    kml: Int
    passengers: Int
    price: Int
    user: User
    userId: String
  }

  type Transaction {
    id: String
    verified: Boolean
    renter: User
    userId: String
    createdAt: Date
  }

  type loginUserResponse {
    success: Boolean
    token: String
    userId: String
  }

  type CreateUserResponse {
    user: User
    token: String
  }

  type IsSuccess {
    success: Boolean
    # error: string
  }

  type Link {
    link: String
    success: Boolean
  }

  # QUERIES = GET REQUESTS
  type Query {
    getUserByEmail(email: String): User
  }

  type Query {
    getUserById(id: String): User
  }
  type Query {
    checkToken(token: String): IsSuccess
  }

  type Query {
    getAllUsers: [User]
  }

  # MUTATIONS = POST or PUT or DELETE REQUESTS
  type Mutation {
    loginUser(email: String, password: String): loginUserResponse
  }

  type Mutation {
    createUser(
      email: String
      password: String
      role: String
    ): CreateUserResponse
  }

  type Mutation {
    updateUserById(
      id: String!
      email: String
      password: String
      name: String
      phone: String
      age: String
    ): User
  }

  type Mutation {
    updateUserByEmail(
      email: String!
      password: String
      name: String
      phone: String
      age: String
    ): User
  }
  # !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  type Mutation {
    resetPasswordRequest(email: String): Link
  }
  type Mutation {
    resetPassword(token: String, password: String, userId: String): IsSuccess
  }

  # DELETE REQUESTS
  type Mutation {
    deleteUserByEmail(email: String!): IsSuccess
  }

  type Mutation {
    deleteUserById(id: String!, token: String!): IsSuccess
  }

  enum Role {
    USER
    ADMIN
  }
`;

export default typeDefs;
