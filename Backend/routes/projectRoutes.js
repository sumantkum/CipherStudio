import express from 'express';
import {  getProjects,  createProject,  getProject,  updateProject,  deleteProject} from '../controllers/projectController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.route('/')
  .get(getProjects)
  .post(createProject);

router.route('/:projectId')
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

export default router;