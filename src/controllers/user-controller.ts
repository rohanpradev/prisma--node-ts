import { Request, Response } from 'express';
import userService from '../services/user.service';

const findAllUsers = async (req: Request, res: Response) => {
  const userList = await userService.getAllUsers();
  return res.status(200).json(userList);
};

const findPaginatedUsers = async (req: Request, res: Response) => {
  const pageNum = parseInt((req?.query?.pageNum as string) || '1');
  const pageSize = parseInt((req?.query?.pageSize as string) || '10');
  const userPaginatedList = await userService.getPaginatedUsers(
    pageNum,
    pageSize
  );
  return res.status(200).json(userPaginatedList);
};

export default { findAllUsers, findPaginatedUsers };
