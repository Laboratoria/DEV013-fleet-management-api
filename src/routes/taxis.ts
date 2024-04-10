import { Router } from 'express';
import { TaxisController } from '../controller/taxis';

const router: Router = Router();

router.get('/taxis', TaxisController.getAllTaxis);
router.get('/location',TaxisController.getLocationHistory)

export default router;