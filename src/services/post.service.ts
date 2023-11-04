import { Prisma } from '@prisma/client';
import prisma from '../db/prisma';

const getAllPosts = () => prisma.post.findMany();

const getPaginatedPosts = (pageNumber = 1, pageSize = 10) =>
  prisma.post.findMany({
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });

const getPublishedPostByTitleCategory = (
  title: string,
  category: string,
  published: boolean = true
) =>
  prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: title, mode: 'insensitive' } },
        { categories: { some: { name: category } } },
      ],
      AND: { published },
    },
  });

const getPostsByAuthorName = (name: string) =>
  prisma.post.findMany({
    where: {
      author: { is: { name } },
    },
    select: {
      title: true,
      author: { select: { name: true } },
    },
  });

const getTotalLikes = () =>
  prisma.post.aggregate({
    _sum: {
      likeNum: true,
    },
  });

const getPostsPerUser = () =>
  prisma.post.groupBy({
    by: ['authorId'],
    _count: {
      authorId: true,
    },
    where: { published: true },
    orderBy: { authorId: 'asc' },
  });

const createNewPost = (data: Prisma.PostCreateInput) =>
  prisma.post.create({ data });

export default {
  getAllPosts,
  getPaginatedPosts,
  getPublishedPostByTitleCategory,
  getTotalLikes,
  getPostsPerUser,
  createNewPost,
};
