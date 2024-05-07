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
exports.TaxisController = void 0;
const db_1 = __importDefault(require("../db"));
// const taxisClient = new PrismaClient().taxis;
// getTaxis
exports.TaxisController = {
    // getAllTaxis
    getAllTaxis: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { skip, take } = req.query;
            if (!skip || !take) {
                return res.status(400).json({ message: "Los parámetros 'skip' y 'take' son obligatorios en la consulta." });
            }
            const allTaxis = yield db_1.default.taxis.findMany({
                skip: skip ? Number(skip) : undefined,
                take: take ? Number(take) : undefined
            });
            return res.status(200).json(allTaxis);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }),
    // getLocationHistory
    // getLocationHistory: async (req: Request, res: Response) => {
    //     try {
    //         const { skip, take } = req.query;
    //         const {taxiId, date} = req.body;
    //         if(!Object.keys(req.body).length){
    //             return  res.status(400).json({message:"Faltan parametros"});
    //         }
    //         const locationHistory = await prisma.trajectories.findMany({
    //             skip: skip ? Number(skip) : undefined,
    //             take: take ? Number(take) : undefined,
    //             where: {
    //                 taxiId:taxiId,
    //                 date: date
    //             },
    //             select:{
    //                 latitude: true,
    //                 longitude:true,
    //                 date:true
    //             }
    //         })
    //         return res.status(200).json(locationHistory);
    //     } catch (error: any) {
    //         return res.status(500).json({ message: error.message })
    //     }
    // },
    getLastLocation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const lastLocation = yield db_1.default.$queryRaw `
            SELECT tax.id, tra.date, tra.latitude, tra.longitude
            FROM "Taxis" tax
            INNER JOIN (
              SELECT taxi_id, date, latitude, longitude,
                     ROW_NUMBER() OVER (PARTITION BY taxi_id ORDER BY date DESC) AS row_num
              FROM "Trajectories"
            ) AS tra ON tax.id = tra.taxi_id AND tra.row_num = 1;
          `;
            return res.status(200).json(lastLocation);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }),
    getTaxiById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const taxiId = parseInt(id);
            const getId = yield db_1.default.taxis.findUnique({
                where: {
                    id: taxiId
                }
            });
            if (!getId)
                res.status(404).json({ message: 'El id del taxi no se encontro' });
            else
                return res.status(200).json(getId);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }),
    postTaxi: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, plate } = req.body;
            const newTaxi = yield db_1.default.taxis.create({
                data: {
                    id, plate
                }
            });
            return res.status(201).json(newTaxi);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }),
    putTaxiById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const taxiId = parseInt(id);
            if (!Object.keys(req.body).length) {
                return res.status(400).json({ message: 'El cuerpo de la solicitud está vacío.' });
            }
            const existingTaxi = yield db_1.default.taxis.findUnique({ where: { id: taxiId } });
            if (!existingTaxi) {
                return res.status(404).json({ message: 'No se ha encontrado un taxi con este ID' });
            }
            const taxi = yield db_1.default.taxis.update({
                where: { id: taxiId },
                data: req.body
            });
            return res.status(200).json(taxi);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }),
    deleteByTaxi: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const taxiId = parseInt(id);
        const existingTaxi = yield db_1.default.taxis.findUnique({ where: { id: taxiId } });
        if (!existingTaxi) {
            return res.status(404).json({ message: 'No se ha encontrado un taxi con este ID' });
        }
        const taxi = yield db_1.default.taxis.delete({ where: { id: taxiId } });
        return res.status(200).json({ message: 'Se ha eliminado correctamente el Taxi', taxi: taxi });
    }),
};
