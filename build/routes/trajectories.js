"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trajectories_1 = require("../controller/trajectories");
const router = express_1.default.Router();
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
router.get('/trajectories', trajectories_1.TrajectoriesController.getAllTrajectories);
router.get('/count', trajectories_1.TrajectoriesController.getTrajectoriesCount);
router.get('/trajectories/:id', trajectories_1.TrajectoriesController.getTrajectoriesById);
router.get('/location/:id', trajectories_1.TrajectoriesController.getLocationHistory);
router.post('/trajectories', trajectories_1.TrajectoriesController.postTrajectories);
router.put('/trajectories/:id', trajectories_1.TrajectoriesController.putTrajectoryById);
router.delete('/trajectories/:id', trajectories_1.TrajectoriesController.deleteTrajectoriesById);
exports.default = router;
