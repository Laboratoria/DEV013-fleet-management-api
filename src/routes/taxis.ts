import { Router } from 'express';
import { TaxisController } from '../controller/taxis';

const router: Router = Router();

router.get('/taxis', TaxisController.getAllTaxis);
router.get('/location',TaxisController.getLocationHistory);
router.get('/lastLocation',TaxisController.getLastLocation)
router.post('/taxis',TaxisController.postTaxi)

export default router;