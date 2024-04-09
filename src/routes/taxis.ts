import { Router } from 'express';
import { TaxisController } from '../controller/taxis';

const router: Router = Router();

router.get('/', TaxisController.getAllTaxis);

export default router;