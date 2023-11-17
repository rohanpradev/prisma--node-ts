import prisma from '../db/prisma';

const getAllUsers = () => prisma.users.findMany();

const getPaginatedUsers = (pageNumber = 1, pageSize = 10) =>
  prisma.users.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });

const getAutocompleteUsers = (searchTerm: string, limit = 5) =>
  prisma.users.findMany({
    where: {
      username: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
    take: limit,
    select: {
      username: true,
      email: true,
    },
  });

const getUserById = (id: number) => prisma.users.findFirst({ where: { id } });

const getUsersByIds = (idList: number[]) =>
  prisma.users.findMany({ where: { id: { in: idList } } });

const getUserByEmail = (email: string) =>
  prisma.users.findFirstOrThrow({ where: { email } });

const getUsersByName = (name: string) =>
  prisma.users.findMany({
    where: {
      username: {
        equals: name,
        mode: 'insensitive',
      },
    },
  });

export default {
  getAllUsers,
  getAutocompleteUsers,
  getPaginatedUsers,
  getUserById,
  getUsersByIds,
  getUserByEmail,
  getUsersByName,
};
