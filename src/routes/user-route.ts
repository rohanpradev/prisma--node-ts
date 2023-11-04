import { Router } from 'express';
import userController from '../controllers/user-controller';

const router = Router();

router.get('/all', userController.findAllUsers);

router.get('/paginated', userController.findPaginatedUsers);

export default router;
