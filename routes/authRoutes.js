import express from 'express';
import { register, login, getUsers, deleteUser, updateProfile, deleteSelf } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/users', auth, getUsers);
router.put('/profile', auth, updateProfile);
router.delete('/profile', auth, deleteSelf);
router.delete('/users/:id', auth, deleteUser);

export default router;
