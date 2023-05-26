import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './resolvers/index.js';
import typeDefs from './typeDefs/index.js';
import authScope from './utils/authScope.js';
import { startServerAndCreateLambdaHandler, handlers, } from '@as-integrations/aws-lambda';
// const main = async () => {};
// main().catch((err) => console.log(err));
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
//   // Middleware for CHECKING TOKEN
//   context: async ({ req, res }) => {
//     const { authorization } = req.headers;
//     if (!authorization) return null;
//     const token = await authScope(authorization);
//     return {
//       token: token,
//     };
//   },
// });
// console.log(`🚀  Server ready at: ${url}`);
// This final export is important!
export const graphqlHandler = startServerAndCreateLambdaHandler(server, 
// We will be using the Proxy V2 handler
handlers.createAPIGatewayProxyEventV2RequestHandler(), {
    context: async ({ event, context }) => {
        const { authorization } = event === null || event === void 0 ? void 0 : event.headers;
        context.callbackWaitsForEmptyEventLoop = false;
        if (!authorization)
            return null;
        const user = await authScope(authorization);
        return {
            user,
            lambdaEvent: event,
            lambdaContext: context,
        };
    },
});
