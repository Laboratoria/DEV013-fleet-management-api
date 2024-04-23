import express, { Router } from 'express';
import { TrajectoriesController } from '../controller/trajectories';

const router: Router = express.Router();

/**
 * Get track
 * @openapi
 * /trajectories:
 *    get:
 *      tags:
 *        - Trajectories
 *      summary: "Obtener todas las trayectorias"
 *      description: Este endpoint es para obtener trayectorias
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
 *                          $ref: '#/components/schemas/Trajectories'
 */

router.get('/trajectories', TrajectoriesController.getAllTrajectories);

/**
 * Get track
 * @openapi
 * /count:
 *    get:
 *      tags:
 *        - Trajectories
 *      summary: "Obtener cuantas trayectorias hay por taxi"
 *      description: Este endpoint es para obtener cuantas trayectorias hay por taxi
 *      responses:
 *        '200':
 *          description: Operación exitosa.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Trajectories'
 *        '500':
 *          description: Error interno del servidor. Hubo un problema al procesar la solicitud.
 *          content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Error'
 */
router.get('/count', TrajectoriesController.getTrajectoriesCount);
/**
 * Get track
 * @openapi
 * /trajectories/{id}:
 *    get:
 *      tags:
 *        - Trajectories
 *      summary: "Buscar trayectoria por Id"
 *      description: "Este endpoint es para buscar trayectoria por Id."
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID de la trayectoria a actualizar
 *          schema:
 *            type: integer
 *      responses:
 *        '200':
 *          description: Operación exitosa. Devuelve el trayectoria buscado.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Trajectories'
 *        '400':
 *          description: Solicitud incorrecta. Puede haber errores en los datos enviados.
 *          content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Error'
 *        '404':
 *          description: No se ha encontrado el taxi con el ID proporcionado.
 *          content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Error'
 *        '500':
 *          description: Error interno del servidor. Hubo un problema al procesar la solicitud.
 *          content:
 *              application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Error'
 */
router.get('/trajectories/:id', TrajectoriesController.getTrajectoriesById);

/**
 * Trajectories
 * @openapi
 * /location/{id}:
 *   get:
 *     tags:
 *       - Location
 *     summary: "Obtener historial de ubicaciones por ID de taxi y fecha"
 *     description: "Este endpoint obtiene el historial de ubicaciones de un taxi para una fecha específica."
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "ID del taxi para el cual se desea obtener el historial de ubicaciones."
 *         schema:
 *           type: integer
 *       - in: query
 *         name: date
 *         required: true
 *         description: "Fecha para la cual se desea obtener el historial de ubicaciones del taxi."
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: "Operación exitosa. Devuelve el historial de ubicaciones del taxi para la fecha especificada."
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     description: "Latitud de la ubicación."
 *                   longitude:
 *                     type: number
 *                     description: "Longitud de la ubicación."
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: "Fecha y hora de la ubicación."
 *       '400':
 *         description: "Solicitud incorrecta. Puede haber errores en los datos enviados."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: "Error interno del servidor. Hubo un problema al procesar la solicitud."
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/location/:id', TrajectoriesController.getLocationHistory);

router.post('/trajectories', TrajectoriesController.postTrajectories);
router.put('/trajectories/:id', TrajectoriesController.putTrajectoryById);
router.delete('/trajectories/:id', TrajectoriesController.deleteTrajectoriesById);
router.get('/exportExcel', TrajectoriesController.getExportExcel);

export default router;