import express,{ Router } from 'express';
import { TrajectoriesController } from '../controller/trajectories';

const router: Router = express.Router();

router.get('/trajectories', TrajectoriesController.getAllTrajectories);
router.get('/count',TrajectoriesController.getTrajectoriesCount);
router.get('/trajectories/:id', TrajectoriesController.getTrajectoriesById)
export default router;