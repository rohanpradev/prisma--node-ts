import { Prisma } from '@prisma/client';
import prisma from '../db/prisma';

const getAllPosts = () => prisma.posts.findMany();

const getPaginatedPosts = (pageNumber = 1, pageSize = 10) =>
  prisma.posts.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });

export default {
  getAllPosts,
  getPaginatedPosts,
};
