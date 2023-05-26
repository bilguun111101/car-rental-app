import dotenv from 'dotenv';
dotenv.config();
import { Prisma } from '../db.js';
import { checkUserExists } from '../utils/checkUserExists.js';
import { createToken } from '../utils/createToken.js';
import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto';
const bcryptSalt = process.env.BCRYPT_SALT;
import jwt from 'jsonwebtoken';
export const userResolvers = {
    Query: {
        getUserByEmail: async (parent, args) => {
            try {
                // if there is no record, "findUnique" returns NULL
                const user = await Prisma.user.findUnique({
                    where: {
                        email: args.email,
                    },
                    include: {
                        rentals: true,
                        cars: true,
                        transactions: true, // Transaction model data will be included. Because in the prisma.schema, User @relation field
                    },
                });
                if (!user)
                    throw new GraphQLError(`No user with this email: ${args.email}`);
                return user;
            }
            catch (error) {
                console.log('GET USER BY EMAIL ERROR', error);
                throw new GraphQLError(error);
            }
        },
        getUserById: async (parent, args) => {
            const { id } = args;
            try {
                // if there is no record, "findUnique" returns NULL
                const user = await Prisma.user.findUnique({
                    where: {
                        id,
                    },
                    include: {
                        rentals: true,
                        cars: true,
                        transactions: true, // Transaction model data will be included. Because in the prisma.schema, User @relation field
                    },
                });
                if (!user)
                    throw new GraphQLError(`No user with this id: ${id}`);
                return user;
            }
            catch (error) {
                console.log('GET USER BY ID ERROR', error);
                throw new GraphQLError(error);
            }
        },
        checkToken: async (parent, args) => {
            const { token } = args;
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const id = decoded === null || decoded === void 0 ? void 0 : decoded.id;
                if (!id)
                    throw new GraphQLError(`No user with this id: ${id}`);
                // if there is no record, "findUnique" returns NULL
                const user = await Prisma.user.findUnique({
                    where: {
                        id,
                    },
                });
                if (!user)
                    throw new GraphQLError(`No user with this id: ${id}`);
                return { success: true };
            }
            catch (error) {
                console.log('CHECK TOKEN ERORR', error);
                throw new GraphQLError('Invalid token!');
            }
        },
        getAllUsers: async () => {
            try {
                const users = await Prisma.user.findMany();
                return users;
            }
            catch (error) {
                console.log('GET ALL USERS ERROR', error);
                throw new GraphQLError(error);
            }
        },
    },
    Mutation: {
        loginUser: async (parent, args) => {
            const { email, password } = args;
            try {
                //1) find user by email(unique)
                // if there is no record, "findUnique" returns NULL
                const user = await Prisma.user.findUnique({
                    where: {
                        email,
                    },
                });
                //2) If there is no user, then throw error
                if (!user) {
                    throw new GraphQLError('User not found!');
                }
                //3) If there is user, then check password
                const hashedPassword = user.password;
                const passwordMatch = bcrypt.compareSync(password, hashedPassword);
                //4) If password does not match, then throw error
                if (!passwordMatch) {
                    throw new GraphQLError('Password does not match!');
                }
                //5) If passes all above criteria, then return final result
                const userId = user.id;
                const token = createToken(userId);
                return { success: true, token, userId };
            }
            catch (error) {
                console.log('loginUser error', error);
                throw new GraphQLError(error);
            }
        },
        createUser: async (_parent, args) => {
            //Prisma.user --> "prisma/schema.prisma" dotor model User bga...
            const { email, password, role } = args;
            try {
                const user = await Prisma.user.create({
                    data: {
                        email,
                        password: await bcrypt.hash(password, +bcryptSalt),
                        role,
                    },
                });
                const userId = user.id;
                const token = createToken(userId);
                return { user, token };
            }
            catch (error) {
                console.log('CREATE USER ERROR', error);
                throw new GraphQLError(`Already signed up with this email: ${email}`);
            }
        },
        updateUserById: async (_parent, args) => {
            const { id, email, name, phone, age } = args;
            //middleware for checking if user exists or not
            const userExists = await checkUserExists(id, 'id');
            if (!userExists) {
                console.log('User not found');
                throw new GraphQLError('User not found');
            }
            try {
                const user = await Prisma.user.update({
                    where: { id },
                    data: {
                        email,
                        name,
                        phone,
                        age,
                    },
                });
                return user;
            }
            catch (error) {
                console.log('UPDATE USER ERROR', error);
                throw new GraphQLError(error);
            }
        },
        updateUserByEmail: async (_parent, args) => {
            const { email, name, phone, age } = args;
            //middleware for checking if user exists or not
            const userExists = await checkUserExists(email, 'email');
            if (!userExists) {
                console.log('User not found');
                throw new GraphQLError('User not found');
            }
            try {
                const user = await Prisma.user.update({
                    where: { email },
                    data: {
                        email,
                        name,
                        phone,
                        age,
                    },
                });
                return user;
            }
            catch (error) {
                console.log('UPDATE USER ERROR', error);
                throw new GraphQLError(error);
            }
        },
        resetPasswordRequest: async (_parent, args) => {
            const { email } = args;
            //1) Check if user exists or not
            const user = await checkUserExists(email, 'email');
            const userId = user === null || user === void 0 ? void 0 : user.id;
            //2) If user not found, then END it here!!!
            if (!userId) {
                console.log('User does not exist');
                throw new GraphQLError('User does not exist');
            }
            //3) Find the token
            // if there is no record, "findUnique" returns NULL
            const token = await Prisma.token.findUnique({
                where: {
                    userId,
                },
            });
            //4) If token is valid, delete the token!!!
            if (token)
                await Prisma.token.delete({
                    where: {
                        userId,
                    },
                });
            //5) Create the New Reset Token, then save it to Token model to database
            const resetToken = crypto.randomBytes(32).toString('hex');
            const hashedResetToken = await bcrypt.hash(resetToken, Number(bcryptSalt));
            await Prisma.token.create({
                data: {
                    userId,
                    token: hashedResetToken,
                },
            });
            //6) Send email link to user's email address.
            const clientURL = process.env.CLIENT_URL;
            const link = `${clientURL}/password/reset?token=${resetToken}&id=${userId}`;
            //When click on this link. Go to "/passwordReset" page. Then fetch id, token from "router.query" on frontend.
            const { success } = await sendEmail(user.email, 'Password Reset Request', `Hello Mr ${user.name}. Please click on this link: ${link} to reset a password.`);
            //7) If mail sending failed, then END it!!!
            if (!success) {
                console.log('Something went wrong with mail service.');
                throw new GraphQLError('User does not exist');
            }
            return { success: true, link };
        },
        resetPassword: async (_parent, args) => {
            const { token, password, userId } = args;
            try {
                //1) Get password reset token from Token model database
                const resetTokenData = await Prisma.token.findUnique({
                    // if there is no record, "findUnique" returns NULL
                    where: {
                        userId,
                    },
                });
                if (!resetTokenData) {
                    throw new GraphQLError(`Wrong user id with this: ${userId}!`);
                }
                //2) Compare tokens if it is valid or not
                const isValid = await bcrypt.compare(token, resetTokenData.token);
                if (!isValid) {
                    throw new GraphQLError('Invalid password reset token!');
                }
                //3) Update user data with new PASSWORD
                const hashedPassword = await bcrypt.hash(password, Number(bcryptSalt));
                const user = await Prisma.user.update({
                    where: { id: userId },
                    data: {
                        password: hashedPassword,
                    },
                });
                const { success } = await sendEmail(user.email, 'Password Reset Request', `Hello Mr ${user.name}. Your password has been successfully updated.`);
                //4) If mail sending failed, then END it!!!
                if (!success) {
                    console.log('Something went wrong with mail service.');
                    throw new GraphQLError('User does not exist');
                }
                return { success: true };
            }
            catch (error) {
                console.log('UPDATE USER PASSWORD ERROR', error);
                throw new GraphQLError(error);
            }
        },
        deleteUserByEmail: async (_parent, args) => {
            try {
                // if there is no record, "delete" returns only ERROR
                await Prisma.user.delete({
                    where: {
                        email: args.email,
                    },
                });
                return { success: true };
            }
            catch (error) {
                console.log('DELETE USER ERROR', error);
                throw new GraphQLError(error);
            }
        },
        deleteUserById: async (_parent, args, context) => {
            try {
                // 1) Middleware for checking user's token
                const decoded = jwt.verify(args.token, process.env.JWT_SECRET);
                const userId = decoded === null || decoded === void 0 ? void 0 : decoded.id;
                // 1.1) getting userId from token verify using context middleware in "index.ts"
                const idToken = context.token.id;
                const authorized = userId === idToken;
                // 1.2) If userId is not right, then ERROR
                if (!authorized) {
                    throw new GraphQLError(`User not authorized. Wrong token or userId: ${args.id}.`);
                }
                // 2) Check user's other related data exists
                const user = await Prisma.user.findUnique({
                    where: {
                        id: args.id,
                    },
                    include: {
                        rentals: true,
                        cars: true,
                        transactions: true, // Transaction model data will be included. Because in the prisma.schema, User @relation field
                    },
                });
                // 2.1) Delete all user's cars data
                if (user.cars.length > 0) {
                    await Prisma.car.deleteMany({
                        where: {
                            userId: args.id,
                        },
                    });
                }
                // 2.2) Delete all user's rentals data
                if (user.rentals.length > 0) {
                    await Prisma.rental.deleteMany({
                        where: {
                            userId: args.id,
                        },
                    });
                }
                // 3) if there is no record, "delete" returns only ERROR
                await Prisma.user.delete({
                    where: {
                        id: args.id,
                    },
                });
                // 4) Delete user's password reset token
                const token = await Prisma.token.findUnique({
                    // if there is no record, "findUnique" returns NULL
                    where: {
                        userId,
                    },
                });
                // 4.1) If token is valid, delete the token!!!
                if (token)
                    await Prisma.token.delete({
                        where: {
                            userId,
                        },
                    });
                return { success: true };
            }
            catch (error) {
                console.log('DELETE USER ERROR', error);
                throw new GraphQLError(error);
            }
        },
    },
};
// https://www.prisma.io/docs/concepts/components/prisma-client/crud#read
//https://blog.logrocket.com/implementing-secure-password-reset-node-js/
