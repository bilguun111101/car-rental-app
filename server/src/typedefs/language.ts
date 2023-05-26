import gql from 'graphql-tag';

const typeDefs = gql`
  type LanguageResponse {
    id: String
    textId: String
    lang: String
    value: String
  }

  type Query {
    getLanguageText: [LanguageResponse]
  }
`;

export default typeDefs;
