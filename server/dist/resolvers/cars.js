import { Prisma } from '../db.js';
import { GraphQLError } from 'graphql';
export const carsResolvers = {
    Query: {
        getCarById: async (_parent, args) => {
            try {
                // if there is no record, "findUnique" returns NULL
                const car = await Prisma.car.findUnique({
                    where: {
                        id: args.id,
                    },
                    include: {
                        user: true, // User model data will be included. Because in the prisma.schema, User @relation field
                    },
                });
                if (!car)
                    throw new GraphQLError(`No car found with this id: ${args.id}`);
                return car;
            }
            catch (error) {
                console.log('GET SINGLE CAR ERROR', error);
                throw new GraphQLError(error);
            }
        },
        getCarsByType: async (_parent, args) => {
            try {
                // if there are no records, "findMany" returns EMPTY[]
                const cars = await Prisma.car.findMany({
                    where: { type: args.type },
                    orderBy: {
                        price: 'desc',
                    },
                    include: {
                        user: true, // User model data will be included. Because in the prisma.schema, User @relation field
                    },
                });
                if (cars.length === 0)
                    throw new GraphQLError(`No cars found with this type: ${args.type}`);
                return cars;
            }
            catch (error) {
                console.log('GET CARS ERROR', error);
                throw new GraphQLError(error);
            }
        },
        getCarsByPassengers: async (_parent, args) => {
            // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#filter-conditions-and-operators
            const passengersNumber = args.passengers;
            try {
                // if passenger number LESS than or equal to 5, then return cars with 5 passengers. etc. SUV, Standard, Economy
                if (passengersNumber <= 5) {
                    const cars = await Prisma.car.findMany({
                        where: {
                            passengers: {
                                lte: 5, // lte means "less than or equal to"
                            },
                        },
                        orderBy: {
                            price: 'desc',
                        },
                        include: {
                            user: true, // User model data will be included. Because in the prisma.schema, User @relation field
                        },
                    });
                    return cars;
                }
                // if passenger number GREATER than or equal to 6, then return cars with 6 or more passengers. etc. Bus
                const cars = await Prisma.car.findMany({
                    where: {
                        passengers: {
                            gte: 6, // gte means "greater than or equal to"
                        },
                    },
                    orderBy: {
                        price: 'desc',
                    },
                    include: {
                        user: true, // User model data will be included. Because in the prisma.schema, User @relation field
                    },
                });
                return cars;
            }
            catch (error) {
                console.log('GET CARS ERROR', error);
                throw new GraphQLError(error);
            }
        },
        getCarsByPriceRange: async (_parent, args) => {
            // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#filter-conditions-and-operators
            const { price } = args;
            try {
                // if passenger number LESS than or equal to 5, then return cars with 5 passengers. etc. SUV, Standard, Economy
                const cars = await Prisma.car.findMany({
                    where: {
                        price: {
                            lte: price, // lte means "less than or equal to"
                        },
                    },
                    orderBy: {
                        price: 'desc',
                    },
                    include: {
                        user: true, // User model data will be included. Because in the prisma.schema, User @relation field
                    },
                });
                return cars;
            }
            catch (error) {
                console.log('GET CARS ERROR', error);
                throw new GraphQLError(error);
            }
        },
        getOwnCars: async (_parent, args) => {
            try {
                // if there are no cars, "findMany" returns EMPTY[]
                const cars = await Prisma.car.findMany({
                    where: { userId: args.userId },
                    orderBy: {
                        price: 'asc',
                    },
                    include: {
                        user: true, // User model data will be included. Because in the prisma.schema, User @relation field
                    },
                });
                if (cars.length === 0)
                    throw new GraphQLError(`No cars found with this userId: ${args.userId}`);
                return cars;
            }
            catch (error) {
                console.log('GET OWN CARS ERROR', error);
                throw new GraphQLError(error);
            }
        },
        getAllCarsWithPagination: async (_parent, args) => {
            // https://www.prisma.io/docs/concepts/components/prisma-client/pagination
            const { skip, take, priceSort } = args;
            try {
                if (priceSort === 'desc') {
                    // if there are no records, "findMany" returns EMPTY[]
                    const cars = await Prisma.car.findMany({
                        // pagination by number
                        skip,
                        take,
                        orderBy: {
                            price: 'desc', // $150, $140, $130 etc.
                        },
                        include: {
                            user: true,
                        },
                    });
                    if (cars.length === 0)
                        throw new GraphQLError(`No cars found `);
                    return cars;
                }
                if (priceSort === 'asc') {
                    // if there are no records, "findMany" returns EMPTY[]
                    const cars = await Prisma.car.findMany({
                        // pagination by number
                        skip,
                        take,
                        orderBy: {
                            price: 'asc', // $130, $140, $150 etc.
                        },
                        include: {
                            user: true,
                        },
                    });
                    if (cars.length === 0)
                        throw new GraphQLError(`No cars found `);
                    return cars;
                }
            }
            catch (error) {
                console.log('GET ALL CARS ERROR', error);
                throw new GraphQLError(error);
            }
        },
    },
    Mutation: {
        createCar: async (_parent, args) => {
            const { image, type, typeDefinition, model, kml, transmission, passengers, price, userId, } = args;
            try {
                const car = await Prisma.car.create({
                    data: {
                        image,
                        type,
                        typeDefinition,
                        model,
                        kml,
                        transmission,
                        passengers,
                        price,
                        userId,
                    },
                    include: {
                        user: true, // User model data will be included. Because in the prisma.schema, User @relation field
                    },
                });
                return car;
            }
            catch (error) {
                console.log('CREATE CAR ERROR', error);
                throw new GraphQLError(error);
            }
        },
        updateCarById: async (_parent, args) => {
            const { id, image, type, typeDefinition, model, kml, transmission, passengers, price, } = args;
            try {
                //If there is no record, "update" returns NOTHING, throws error
                const car = await Prisma.car.update({
                    where: { id },
                    data: {
                        image,
                        type,
                        typeDefinition,
                        model,
                        kml,
                        transmission,
                        passengers,
                        price,
                    },
                    include: {
                        user: true, // User model data will be included. Because in the prisma.schema, User @relation field
                    },
                });
                return car;
            }
            catch (error) {
                console.log('UPDATE CAR ERROR', error);
                throw new GraphQLError(`No car found with ${id}`);
            }
        },
        deleteCarById: async (_parent, args) => {
            const { id } = args;
            try {
                // if there is no record, "delete" returns only ERROR
                await Prisma.car.delete({
                    where: {
                        id,
                    },
                });
                return { success: true, id };
            }
            catch (error) {
                console.log('DELETE CAR ERROR', error);
                throw new GraphQLError(`There is no car to be deleted with this id ${id}`);
            }
        },
        deleteCarsByUserId: async (_parent, args) => {
            const userId = args.userId;
            try {
                // if there are no records, "deleteMany" returns only {count: 0}
                const result = await Prisma.car.deleteMany({
                    where: {
                        userId,
                    },
                });
                if (result.count === 0)
                    throw new GraphQLError(`There are no cars to be deleted with this userId ${userId}`);
                return { success: true };
            }
            catch (error) {
                console.log('DELETE CAR ERROR', error);
                throw new GraphQLError(error);
            }
        },
    },
};
// https://www.prisma.io/docs/concepts/components/prisma-client/crud#read
