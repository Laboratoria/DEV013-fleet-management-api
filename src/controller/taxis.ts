import type { Request, Response } from "express";
import { AllTaxisService, TaxiByIdService } from "../services/taxis";
// import prisma from "../utils/db";


// getTaxis
export const TaxisController = {
    // getAllTaxis
    getAllTaxis: async (req: Request, res: Response) => {
        try {
            const { skip, take } = req.query;
            if (!skip || !take) {
                return res.status(400).json({ message: "Los parámetros 'skip' y 'take' son obligatorios en la consulta." });
            }
            const taxis = await AllTaxisService(Number(skip),Number(take))
            return res.status(200).json(taxis);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error en el servidor' })
        }
    },
    getTaxiById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const getId = await TaxiByIdService(id)
            if (!getId) res.status(404).json({ message: 'El id del taxi no se encontro' });
            else return res.status(200).json(getId);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error en el servidor' })
        }
    },
    postTaxi: async (req: Request, res: Response) => {
        try {
            const { id, plate } = req.body;
            const newTaxi = await prisma.taxis.create({
                data: {
                    id, plate
                }
            })
            return res.status(201).json(newTaxi);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error en el servidor' })
        }
    },
    putTaxiById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const taxiId = parseInt(id);
            if (!Object.keys(req.body).length) {
                return res.status(400).json({ message: 'El cuerpo de la solicitud está vacío.' })
            }
            const existingTaxi = await prisma.taxis.findUnique({ where: { id: taxiId } });
            if (!existingTaxi) {
                return res.status(404).json({ message: 'No se ha encontrado un taxi con este ID' });
            }
            const taxi = await prisma.taxis.update({
                where: { id: taxiId },
                data: req.body
            });

            return res.status(200).json(taxi);

        } catch (error: any) {
            return res.status(500).json({ message: error.message })
        }
    },
    deleteByTaxi: async (req: Request, res: Response) => {
        const { id } = req.params;
        const taxiId = parseInt(id);

        const existingTaxi = await prisma.taxis.findUnique({ where: { id: taxiId } });
        if (!existingTaxi) {
            return res.status(404).json({ message: 'No se ha encontrado un taxi con este ID' });
        }
        const taxi = await prisma.taxis.delete({ where: { id: taxiId } });
        return res.status(200).json({ message: 'Se ha eliminado correctamente el Taxi', taxi: taxi });
    },
}
