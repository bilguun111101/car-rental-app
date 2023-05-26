import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      success
      userId
      token
    }
  }
`;

export const CREATE_NEW_USER = gql`
  mutation createUser($email: String, $password: String, $role: String) {
    createUser(email: $email, password: $password, role: $role) {
      user {
        age
        email
        id
        name
        phone
        role
        rentals {
          id
          dateRent
          dateReturn
          location
          verified
          createdAt
        }
      }
      token
    }
  }
`;

export const PASSWORD_RESET_REQUEST = gql`
  mutation ResetPasswordRequest($email: String) {
    resetPasswordRequest(email: $email) {
      link
      success
    }
  }
`;

export const PASSWORD_RESET = gql`
  mutation ResetPassword($token: String, $password: String, $userId: String) {
    resetPassword(token: $token, password: $password, userId: $userId) {
      success
    }
  }
`;

export const UPDATE_USER_BY_ID = gql`
  mutation UpdateUserById(
    $id: String!
    $email: String
    $name: String
    $phone: String
    $age: String
  ) {
    updateUserById(
      id: $id
      email: $email
      name: $name
      phone: $phone
      age: $age
    ) {
      age
      createdAt
      email
      id
      name
      phone
    }
  }
`;
export const UPDATE_USER_BY_EMAIL = gql`
  mutation UpdateUserByEmail(
    $email: String!
    $password: String
    $name: String
    $phone: String
    $age: String
  ) {
    updateUserByEmail(
      email: $email
      password: $password
      name: $name
      phone: $phone
      age: $age
    ) {
      email
      name
      id
      phone
      password
      age
      createdAt
    }
  }
`;

export const DELETE_USER_BY_EMAIL = gql`
  mutation DeleteUserByEmail($email: String!) {
    deleteUserByEmail(email: $email) {
      success
    }
  }
`;
export const DELETE_USER_BY_ID = gql`
  mutation DeleteUserById($id: String!, $token: String!) {
    deleteUserById(id: $id, token: $token) {
      success
    }
  }
`;
