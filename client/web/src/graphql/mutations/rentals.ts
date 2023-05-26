import { gql } from '@apollo/client';

export const CREATE_RENTAL = gql`
  mutation CreateRental(
    $userId: String
    $dateRent: String
    $dateReturn: String
    $totalDays: Int
    $location: String
    $verified: Boolean
    $extras: ExtrasInput
    $car: CarInput
  ) {
    createRental(
      userId: $userId
      dateRent: $dateRent
      dateReturn: $dateReturn
      totalDays: $totalDays
      location: $location
      verified: $verified
      extras: $extras
      car: $car
    ) {
      createdAt
      dateRent
      dateReturn
      id
      location
      totalDays
      verified
      userId
      extras {
        GPS
        child_safety
        coverage
      }
      car {
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
      user {
        createdAt
        email
        name
        phone
      }
    }
  }
`;
