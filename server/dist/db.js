import { PrismaClient } from '@prisma/client';
export const Prisma = new PrismaClient();
// import { PrismaClient } from '@prisma/client'
// export const Prisma = global.prismadb || new PrismaClient();
// if (process.env.NODE_ENV !== 'production') global.prismadb = Prisma;
// export default client
