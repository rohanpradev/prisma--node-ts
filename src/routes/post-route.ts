import { Router } from 'express';
import postController from '../controllers/post-controller';

const router = Router();

router.get('/all', postController.findAllPosts);

router.get('/paginated', postController.findPaginatedPosts);

router.get('/count', postController.findCountPostsPerUser);

router.post('/new', postController.createNewPost);

export default router;
