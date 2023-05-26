import { gql } from '@apollo/client';

export const CREATE_CAR = gql`
  mutation CreateCar(
    $image: String
    $type: String
    $typeDefinition: String
    $model: String
    $transmission: String
    $userId: String
    $kml: Int
    $passengers: Int
    $price: Int
  ) {
    createCar(
      image: $image
      type: $type
      typeDefinition: $typeDefinition
      model: $model
      kml: $kml
      transmission: $transmission
      passengers: $passengers
      price: $price
      userId: $userId
    ) {
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
      user {
        email
        name
        createdAt
      }
    }
  }
`;

export const UPDATE_CAR_BY_ID = gql`
  mutation UpdateCarById(
    $image: String
    $type: String
    $typeDefinition: String
    $model: String
    $kml: Int
    $transmission: String
    $passengers: Int
    $price: Int
    $id: String
  ) {
    updateCarById(
      image: $image
      type: $type
      typeDefinition: $typeDefinition
      model: $model
      kml: $kml
      transmission: $transmission
      passengers: $passengers
      price: $price
      id: $id
    ) {
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

export const DELETE_CAR_BY_ID = gql`
  mutation DeleteCarById($id: String) {
    deleteCarById(id: $id) {
      success
      id
    }
  }
`;

export const DELETE_CARS_BY_USERID = gql`
  mutation DeleteCarsByUserId($userId: String) {
    deleteCarsByUserId(userId: $userId) {
      success
    }
  }
`;
