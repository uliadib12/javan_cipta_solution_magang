import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', userController.deleteUserById);

export default router;