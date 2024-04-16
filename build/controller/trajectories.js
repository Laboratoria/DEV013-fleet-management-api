"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrajectoriesController = void 0;
const db_1 = __importDefault(require("../db"));
exports.TrajectoriesController = {
    getAllTrajectories: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { skip, take } = req.query;
            const trajectories = yield db_1.default.trajectories.findMany({
                skip: skip ? Number(skip) : undefined,
                take: take ? Number(take) : undefined,
            });
            return res.status(200).json(trajectories);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }),
    getLocationHistory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { skip, take } = req.query;
            const { taxiId, date } = req.body;
            if (!Object.keys(req.body).length) {
                return res.status(400).json({ message: "Faltan parametros" });
            }
            const locationHistory = yield db_1.default.trajectories.findMany({
                skip: skip ? Number(skip) : undefined,
                take: take ? Number(take) : undefined,
                where: {
                    taxiId: taxiId,
                    date: date
                },
                select: {
                    latitude: true,
                    longitude: true,
                    date: true
                }
            });
            return res.status(200).json(locationHistory);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }),
    getTrajectoriesCount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const countTrajectories = yield db_1.default.trajectories.groupBy({
                by: ['taxiId'],
                _count: {
                    taxiId: true,
                }
            });
            return res.status(201).json(countTrajectories);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }),
    getTrajectoriesById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const trajectory = yield db_1.default.trajectories.findUnique({ where: { id: parseInt(id) } });
            if (!trajectory) {
                return res.status(404).json({ message: 'El id de la trayectoria no se encontro' });
            }
            return res.status(200).json(trajectory);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }),
    postTrajectories: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, latitude, longitude, taxi_id } = req.body;
            const currentTime = new Date();
            const newTrajectories = yield db_1.default.trajectories.create({
                data: {
                    id, latitude, longitude, taxiId: taxi_id, date: currentTime
                }
            });
            return res.status(201).json(newTrajectories);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }),
    putTrajectoryById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!Object.keys(req.body).length) {
                return res.status(400).json({ mesage: "El cuerpo de la solicitud está vacío" });
            }
            const existingTrajectories = yield db_1.default.trajectories.findUnique({ where: { id: parseInt(id) } });
            if (!existingTrajectories) {
                return res.status(404).json({ message: 'No se ha encontrado una trayectoria con este ID' });
            }
            const updateTrajectories = yield db_1.default.trajectories.update({ where: { id: parseInt(id) }, data: req.body });
            return res.status(200).json(updateTrajectories);
        }
        catch (error) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    }),
    deleteTrajectoriesById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const existingTrajectories = yield db_1.default.trajectories.findUnique({ where: { id: parseInt(id) } });
            if (!existingTrajectories) {
                return res.status(404).json({ message: "La trayectoria no existe." });
            }
            else {
                yield db_1.default.trajectories.delete({ where: { id: parseInt(id) } });
                return res.status(200).json({ message: "Trayectoria eliminada correctamente." });
            }
        }
        catch (error) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    }),
};
