import { gql } from '@apollo/client';

export const GET_ALL_LANGUAGES = gql`
  query getLanguageText {
    getLanguageText {
      id
      lang
      textId
      value
    }
  }
`;
