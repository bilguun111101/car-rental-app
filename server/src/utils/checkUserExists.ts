import { Prisma } from '../db.js';

export const checkUserExists = async (identifier: string, type: string) => {
  let user = null;

  try {
    //1) find user by email(unique)
    if (type === 'email') {
      user = await Prisma.user.findUnique({
        where: {
          email: identifier,
        },
      });
      if (!user) return null;
    }

    //1) find user by id
    if (type === 'id') {
      user = await Prisma.user.findUnique({
        where: {
          id: identifier,
        },
      });
      if (!user) return null;
    }

    //2) If there is no user, then throw error
    return user;
  } catch (error: any) {
    console.log('loginUser error', error);
    return null;
  }
};
