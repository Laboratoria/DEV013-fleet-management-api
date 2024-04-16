import express,{ Router } from 'express';
import { TrajectoriesController } from '../controller/trajectories';

const router: Router = express.Router();

router.get('/trajectories', TrajectoriesController.getAllTrajectories);
router.get('/location',TrajectoriesController.getLocationHistory);
router.get('/count',TrajectoriesController.getTrajectoriesCount);
router.get('/trajectories/:id', TrajectoriesController.getTrajectoriesById);
router.post('/trajectories',TrajectoriesController.postTrajectories);
router.put('/trajectories/:id', TrajectoriesController.putTrajectoryById);
router.delete('/trajectories/:id',TrajectoriesController.deleteTrajectoriesById)

export default router;