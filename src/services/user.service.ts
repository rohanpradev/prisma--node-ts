import prisma from '../db/prisma';

const getAllUsers = () => prisma.user.findMany();

const getPaginatedUsers = (pageNumber = 1, pageSize = 10) =>
  prisma.user.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });

const getAutocompleteUsers = (searchTerm: string, limit = 5) =>
  prisma.user.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
    take: limit,
    select: {
      name: true,
      email: true,
    },
  });

const getUserById = (id: number) => prisma.user.findFirst({ where: { id } });

const getUsersByIds = (idList: number[]) =>
  prisma.user.findFirst({ where: { id: { in: idList } } });

const getUserByEmail = (email: string) =>
  prisma.user.findFirstOrThrow({ where: { email } });

const getUsersByName = (name: string) =>
  prisma.user.findMany({
    where: {
      name: {
        equals: name,
        mode: 'insensitive',
      },
    },
  });

const getUsersWithAllPostPublished = () =>
  prisma.user.findMany({
    where: {
      posts: { every: { published: true } },
    },
  });

const getUsersWithNonePostUnPublished = () =>
  prisma.user.findMany({
    where: {
      posts: { none: { published: false } },
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
