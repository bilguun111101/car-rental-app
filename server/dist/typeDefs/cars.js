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

  type Details {
    make: String
    mode: String
    year: String
    exterior: String
    interioir: String
  }

  type Rental {
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

  type IsSuccess {
    success: Boolean
  }

  type deleteCarResponse {
    success: Boolean
    id: String
  }

  # QUERIES = GET REQUESTS
  type Query {
    getCarById(id: String): Car
  }

  type Query {
    getCarsByType(type: String): [Car]
  }

  type Query {
    getCarsByPassengers(passengers: Int): [Car]
  }

  type Query {
    getCarsByPriceRange(price: Int): [Car]
  }

  type Query {
    getOwnCars(userId: String): [Car]
  }
  type Query {
    getAllCarsWithPagination(skip: Int, take: Int, priceSort: String): [Car]
  }

  # MUTATIONS = POST or PUT or DELETE REQUESTS
  type Mutation {
    createCar(
      image: String
      type: String
      typeDefinition: String
      model: String
      transmission: String
      kml: Int
      passengers: Int
      price: Int
      userId: String
    ): Car
  }

  type Mutation {
    updateCarById(
      id: String
      image: String
      type: String
      typeDefinition: String
      model: String
      kml: Int
      transmission: String
      passengers: Int
      price: Int
    ): Car
  }

  type Mutation {
    deleteCarById(id: String): deleteCarResponse
  }

  type Mutation {
    deleteCarsByUserId(userId: String): IsSuccess
  }
`;
export default typeDefs;
