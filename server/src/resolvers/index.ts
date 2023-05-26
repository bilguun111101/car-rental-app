import merge from 'lodash.merge';
import { userResolvers } from './user.js';
import { rentalResolvers } from './rental.js';
import { transactionResolvers } from './transaction.js';
import { carsResolvers } from './cars.js';
import scalarResolvers from './scalars.js';
import { languageResolvers } from './language.js';

const resolvers = merge(
  {},
  userResolvers,
  rentalResolvers,
  transactionResolvers,
  carsResolvers,
  languageResolvers,
  scalarResolvers
);

export default resolvers;
