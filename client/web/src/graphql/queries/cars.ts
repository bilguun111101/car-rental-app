import { gql } from '@apollo/client';

export const GET_CARS_BY_TYPE = gql`
  query GetCarsByType($type: String) {
    getCarsByType(type: $type) {
      id
      image
      kml
      model
      passengers
      price
      transmission
      type
      typeDefinition
      userId
    }
  }
`;

export const GET_CARS_BY_PASSENGERS = gql`
  query GetCarsByPassengers($passengers: Int) {
    getCarsByPassengers(passengers: $passengers) {
      id
      image
      kml
      model
      passengers
      price
      transmission
      type
      typeDefinition
      userId
    }
  }
`;

export const GET_ALL_CARS_WITH_PAGINATION = gql`
  query getAllCarsWithPagination($take: Int, $skip: Int, $priceSort: String) {
    getAllCarsWithPagination(take: $take, skip: $skip, priceSort: $priceSort) {
      id
      image
      kml
      model
      passengers
      price
      transmission
      type
      typeDefinition
      userId
    }
  }
`;

export const GET_CARS_BY_PRICE = gql`
  query getCarsByPriceRange($price: Int) {
    getCarsByPriceRange(price: $price) {
      id
      image
      kml
      model
      passengers
      price
      transmission
      type
      typeDefinition
    }
  }
`;

export const GET_OWN_CARS_BY_ID = gql`
  query GetOwnCars($userId: String) {
    getOwnCars(userId: $userId) {
      id
      image
      kml
      model
      passengers
      price
      transmission
      type
      typeDefinition
    }
  }
`;

export const GET_CAR_BY_ID = gql`
  query GetCarById($id: String) {
    getCarById(id: $id) {
      id
      image
      kml
      model
      price
      passengers
      transmission
      type
      typeDefinition
    }
  }
`;
