import { Router } from 'express';
import { TaxisController } from '../controller/taxis';

const router: Router = Router();

/**
 * Get track
 * @openapi
 * /taxis:
 *    get:
 *      tags:
 *        - Taxis
 *      summary: "Obtener taxis"
 *      description: Este endpoint es para obtener taxis
 *      parameters:
 *        - in: query
 *          name: skip
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: Número de página que se desea obtener
 *        - in: query
 *          name: take
 *          schema:
 *            type: integer
 *            minimum: 1
 *            maximum: 100
 *            default: 10
 *          description: Número máximo de resultados por página
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

router.get('/taxis', TaxisController.getAllTaxis);

/**
 * Get track
 * @openapi
 * /location:
 *    get:
 *      tags:
 *        - Taxis
 *      summary: "Obtener latitud, longitud y fecha de cada taxi"
 *      description: Este endpoint es para obtener latitud, longitud y fecha de cada taxi 
 *      parameters:
 *        - in: query
 *          name: skip
 *          schema:
 *            type: integer
 *            minimum: 1
 *          description: Número de página que se desea obtener
 *        - in: query
 *          name: take
 *          schema:
 *            type: integer
 *            minimum: 1
 *            maximum: 100
 *            default: 10
 *          description: Número máximo de resultados por página
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

router.get('/location', TaxisController.getLocationHistory);
router.get('/lastLocation', TaxisController.getLastLocation)

/**
 * Post Taxi
 * @openapi
 * /taxis:
 *    post:
 *      tags:
 *        - Taxis
 *      summary: "Crear taxis"
 *      description: Este endpoint permite crear taxis.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Taxis'
 *      responses:
 *        '201':
 *          description: Taxi creado exitosamente.
 */
router.post('/taxis', TaxisController.postTaxi)

export default router;