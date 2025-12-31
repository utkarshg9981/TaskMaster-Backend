import express from 'express';
import {
  createTask,
  getTasks,
  getAssignedTasks,
  getCreatedTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from '../controllers/taskController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/assigned', getAssignedTasks);
router.get('/created', getCreatedTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

router.patch('/:id/status', updateTaskStatus);

export default router;
