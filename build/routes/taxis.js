"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taxis_1 = require("../controller/taxis");
const router = express_1.default.Router();
router.get('/taxis', taxis_1.TaxisController.getAllTaxis);
router.get('/location', taxis_1.TaxisController.getLocationHistory);
// router.get('/lastLocation',TaxisController.getLastLocation)
router.get('/taxis/:id', taxis_1.TaxisController.getTaxiById);
router.post('/taxis', taxis_1.TaxisController.postTaxi);
router.put('/taxis/:id', taxis_1.TaxisController.putTaxiById);
router.delete('/taxis/:id', taxis_1.TaxisController.deleteByTaxi);
exports.default = router;
