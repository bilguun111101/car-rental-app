import { GraphQLError } from 'graphql';
import { Prisma } from '../db.js';

export const transactionResolvers = {
  Query: {
    getTransactionById: async (parent: any, args: { id: string }) => {
      try {
        const transaction = await Prisma.transaction.findUnique({
          where: {
            id: args.id,
          },
          include: {
            user: true, // User model data will be included. Because in the prisma.schema, User @relation field
          },
        });

        return transaction;
      } catch (error) {
        console.log('GET SINGLE TRANSACTION ERROR', error);
        throw new GraphQLError(error);
      }
    },

    getAllTransactions: async () => {
      try {
        const transactions = await Prisma.transaction.findMany({
          orderBy: {
            createdAt: 'desc',
          },
        });
        return transactions;
      } catch (error) {
        console.log('GET ALL TRANSACTIONS ERROR', error);
        throw new GraphQLError(error);
      }
    },
  },

  Mutation: {
    createTransaction: async (_parent: any, args: Transaction) => {
      const { userId, verified } = args;
      try {
        const transaction = await Prisma.transaction.create({
          data: {
            userId,
            verified,
          },
          include: {
            user: true, // User model data will be included. Because in the prisma.schema, User @relation field
          },
        });
        return transaction;
      } catch (error) {
        console.log('CREATE TRANSACTION ERROR', error);
        throw new GraphQLError(error);
      }
    },
  },
};

// https://www.prisma.io/docs/concepts/components/prisma-client/crud#read
