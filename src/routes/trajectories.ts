import express,{ Router } from 'express';
import { TrajectoriesController } from '../controller/trajectories';

const router: Router = express.Router();

router.get('/trajectories', TrajectoriesController.getAllTrajectories);
router.get('/count',TrajectoriesController.getTrajectoriesCount)
export default router;