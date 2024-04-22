import express,{ Router } from 'express';
import { TrajectoriesController } from '../controller/trajectories';

const router: Router = express.Router();

router.get('/trajectories', TrajectoriesController.getAllTrajectories);
router.get('/count',TrajectoriesController.getTrajectoriesCount);
router.get('/trajectories/:id', TrajectoriesController.getTrajectoriesById);
router.get('/location/:id',TrajectoriesController.getLocationHistory)
router.post('/trajectories',TrajectoriesController.postTrajectories);
router.put('/trajectories/:id', TrajectoriesController.putTrajectoryById);
router.delete('/trajectories/:id',TrajectoriesController.deleteTrajectoriesById);
router.get('/exportExcel',TrajectoriesController.getExportExcel)
// 以下は管理者用

export default router;