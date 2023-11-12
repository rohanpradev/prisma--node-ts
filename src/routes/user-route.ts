import { Router } from 'express';
import userController from '../controllers/user-controller';

const router = Router();

router.get('/all', userController.findAllUsers);

router.get('/autocomplete', userController.findAutocompleteUsers);

router.get('/paginated', userController.findPaginatedUsers);

export default router;
