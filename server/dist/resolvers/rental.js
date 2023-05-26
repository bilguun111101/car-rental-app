import { GraphQLError } from 'graphql';
import { Prisma } from '../db.js';
export const rentalResolvers = {
    // ===============QUERIES=============================
    Query: {
        getRentalById: async (parent, args) => {
            try {
                const id = args.id;
                const rental = await Prisma.rental.findUnique({
                    where: {
                        id,
                    },
                    include: {
                        user: true, // User model data will be included. Because in the prisma.schema, User @relation field
                    },
                });
                if (!rental)
                    throw new GraphQLError(`There is no such rental with this id: ${id}`);
                return rental;
            }
            catch (error) {
                console.log('GET RENTAL ERROR', error);
                throw new GraphQLError(error);
            }
        },
        getOwnRentals: async (_parent, args) => {
            try {
                const rentals = await Prisma.rental.findMany({
                    where: { userId: args.userId },
                    orderBy: {
                        createdAt: 'desc',
                    },
                });
                if (!rentals)
                    throw new GraphQLError(`No rentals with this userId: ${args.userId}`);
                return rentals;
            }
            catch (error) {
                console.log('GET OWN RENTALS ERROR', error);
                throw new GraphQLError(error);
            }
        },
        getAllRentals: async () => {
            try {
                const rentals = await Prisma.rental.findMany({
                    orderBy: {
                        createdAt: 'desc',
                    },
                });
                return rentals;
            }
            catch (error) {
                console.log('GET ALL RENTAL ERROR', error);
                throw new GraphQLError(error);
            }
        },
    },
    // =================MUTATIONS==========================
    Mutation: {
        createRental: async (_parent, args, context) => {
            const { userId, dateRent, dateReturn, totalDays, location, verified, extras, car, } = args;
            // getting userId from token verify using context middleware in "index.ts"
            const idToken = context.token.id;
            const authorized = userId === idToken;
            //If userId is not right, then ERROR
            if (!authorized) {
                throw new GraphQLError('User not authorized. Wrong token or userId.');
            }
            try {
                const rental = await Prisma.rental.create({
                    data: {
                        userId,
                        dateRent,
                        dateReturn,
                        totalDays,
                        location,
                        verified,
                        extras,
                        car,
                    },
                    include: {
                        user: true, // User model data will be included. Because in the prisma.schema, User @relation field
                    },
                });
                return rental;
            }
            catch (error) {
                console.log('CREATE RENTAL ERROR>>>>>>>>>>', error);
                throw new GraphQLError(error);
            }
        },
        updateRentalById: async (_parent, args) => {
            const { id, dateRent, dateReturn, location, verified, extras } = args;
            try {
                const rental = await Prisma.rental.update({
                    where: { id },
                    data: {
                        dateRent,
                        dateReturn,
                        location,
                        verified,
                        extras,
                    },
                });
                return rental;
            }
            catch (error) {
                console.log('UPDATE RENTAL ERROR', error);
                throw new GraphQLError(error);
            }
        },
        deleteRentalById: async (_parent, args) => {
            try {
                await Prisma.rental.delete({
                    where: {
                        id: args.id,
                    },
                });
                return { success: true };
            }
            catch (error) {
                console.log('DELETE RENTAL ERROR', error);
                throw new GraphQLError(error);
            }
        },
    },
};
// https://www.prisma.io/docs/concepts/components/prisma-client/crud#read
