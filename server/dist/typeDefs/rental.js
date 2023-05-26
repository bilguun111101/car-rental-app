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
    rentals: [Rental]
    createdAt: Date
  }

  type RentalType {
    id: String
    dateRent: String
    dateReturn: String
    totalDays: Int
    location: String
    verified: Boolean
    user: User
    userId: String
    createdAt: Date
    extras: Extras
    car: Car
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
  }

  type Extras {
    coverage: Boolean
    child_safety: Boolean
    GPS: Boolean
  }

  # https://stackoverflow.com/questions/45806368/graphql-error-field-type-must-be-input-type-but-got

  # In GraphQL, an input cannot be used as a type and a type cannot be used as an input.
  # Must use "input" type for graphql function parameters input

  input ExtrasInput {
    coverage: Boolean
    child_safety: Boolean
    GPS: Boolean
  }

  input CarInput {
    image: String
    type: String
    typeDefinition: String
    model: String
    transmission: String
    kml: Int
    passengers: Int
    price: Int
  }

  type IsSuccess {
    success: Boolean
  }

  # QUERIES = GET REQUESTS
  type Query {
    getRentalById(id: String): RentalType
  }
  type Query {
    getOwnRentals(userId: String): [RentalType]
  }

  type Query {
    getAllRentals: [RentalType]
  }

  # MUTATIONS = POST or PUT or DELETE REQUESTS
  type Mutation {
    createRental(
      userId: String
      dateRent: String
      dateReturn: String
      totalDays: Int
      location: String
      verified: Boolean
      extras: ExtrasInput
      car: CarInput
    ): RentalType
  }

  type Mutation {
    updateRentalById(
      id: String
      dateRent: String
      dateReturn: String
      totalDays: Int
      location: String
      verified: Boolean
      extras: ExtrasInput
    ): RentalType
  }

  type Mutation {
    deleteRentalById(id: String): IsSuccess
  }
`;
export default typeDefs;
