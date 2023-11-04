import { Request, Response } from 'express';
import postService from '../services/post.service';

//#region GET METHOD
const findAllPosts = async (req: Request, res: Response) => {
  const postList = await postService.getAllPosts();
  return res.status(200).json(postList);
};

const findPaginatedPosts = async (req: Request, res: Response) => {
  const pageNum = parseInt((req?.query?.pageNum as string) || '1');
  const pageSize = parseInt((req?.query?.pageSize as string) || '10');
  const postPaginatedList = await postService.getPaginatedPosts(
    pageNum,
    pageSize
  );
  return res.status(200).json(postPaginatedList);
};

const findCountPostsPerUser = async (req: Request, res: Response) => {
  const result = await postService.getPostsPerUser();
  return res.status(200).json(result);
};
//#endregion

//#region POST METHOD
const createNewPost = async (req: Request, res: Response) => {
  const authorId = parseInt((req.query?.authorId as string | undefined) || '1');
  const newPost = await postService.createNewPost({
    ...req.body,
    author: {
      connect: { id: authorId },
    },
  });
  return res.status(200).json(newPost);
};

//#endregion

export default {
  findAllPosts,
  findPaginatedPosts,
  findCountPostsPerUser,
  createNewPost,
};
