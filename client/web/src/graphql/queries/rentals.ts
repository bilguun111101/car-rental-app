import { gql } from '@apollo/client';

export const GET_ALL_RENTALS = gql`
  query GetAllRentals {
    getAllRentals {
      createdAt
      dateRent
      dateReturn
      extras {
        GPS
        child_safety
        coverage
      }
      id
      location
      renter {
        age
        createdAt
        email
        name
        phone
      }
      totalDays
      userId
      verified
    }
  }
`;
export const GET_OWN_RENTALS = gql`
  query GetOwnRentals($userId: String) {
    getOwnRentals(userId: $userId) {
      createdAt
      dateRent
      dateReturn
      id
      location
      verified
      totalDays
      extras {
        GPS
        child_safety
        coverage
      }
      car {
        image
        model
        type
      }
    }
  }
`;
