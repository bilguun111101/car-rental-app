import { Prisma } from '../db.js';
import { GraphQLError } from 'graphql';

export const languageResolvers = {
  Query: {
    getLanguageText: async () => {
      try {
        // if there is no record, "findUnique" returns NULL
        const language = await Prisma.language.findMany();

        return language;
      } catch (error) {
        console.log('GET LANGUAGE ERROR', error);
        throw new GraphQLError(error);
      }
    },
  },
};
