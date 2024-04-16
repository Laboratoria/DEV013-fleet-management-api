import express,{ Router } from 'express';
import { TaxisController } from '../controller/taxis';

const router: Router = express.Router();

router.get('/taxis', TaxisController.getAllTaxis);
router.get('/location',TaxisController.getLocationHistory);
router.get('/lastLocation',TaxisController.getLastLocation)
router.get('/taxis/:id',TaxisController.getTaxiById);
router.post('/taxis',TaxisController.postTaxi);
router.put('/taxis/:id',TaxisController.putTaxiById);
router.delete('/taxis/:id',TaxisController.deleteByTaxi)

export default router;