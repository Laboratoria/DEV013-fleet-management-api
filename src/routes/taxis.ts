import { Router } from 'express';
import { TaxisController } from '../controller/taxis';

const router: Router = Router();

<<<<<<< HEAD
router.get('/taxis', TaxisController.getAllTaxis);
router.get('/location',TaxisController.getLocationHistory);
router.get('/lastLocation',TaxisController.getLastLocation)
router.post('/taxis',TaxisController.postTaxi)
=======
/**
 * Post track
 * @openapi
 * /taxis:
 *    get:
 *      tags:
 *        - taxis
 *      summary: "Obtener taxis"
 *      description: Este endpoint es para obtener los taxis  
 *      responses:
 *        '200':
 *          description: Operación exitosa.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Taxis'
 */


router.get('/', TaxisController.getAllTaxis);
>>>>>>> 621298f (feat(taxis.ts):Add documentation to get)

export default router;