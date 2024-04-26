import type { Request, Response } from "express";
import { allTaxisService, createTaxiService, deleteTaxiService, taxiByIdService, updateTaxiService,IPaginated } from "../services/taxis";
// import prisma from "../utils/db";


// getTaxis
export const TaxisController = {
    // getAllTaxis
    getAllTaxis: async (req: Request, res: Response) => {
        try {
            const { skip, take }:IPaginated = req.query;
            if (!skip || !take) {
                return res.status(400).json({ message: "Los parámetros 'skip' y 'take' son obligatorios en la consulta." });
            }
            const taxis = await allTaxisService(Number(skip), Number(take))
            return res.status(200).json(taxis);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error en el servidor' ,error})
        }
    },
    getTaxiById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const getId = await taxiByIdService(+id)
            if (!getId) res.status(404).json({ message: 'El id del taxi no se encontro' });
            else return res.status(200).json(getId);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error en el servidor' })
        }
    },
    postTaxi: async (req: Request, res: Response) => {
        try {
            const { id, plate } = req.body;
            if(!id  || !plate){
                return  res.status(400).json({message:'No se enviaron los campos necesarios'});
            }
            const existingTaxi = await taxiByIdService(id);
            if(existingTaxi){
                return  res.status(403).json({message:'El taxi ya existe'})
            }
            const newTaxi = await createTaxiService(id,plate)
            return res.status(201).json(newTaxi);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error en el servidor' })
        }
    },
    putTaxiById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            // const taxiId = parseInt(id);
            if (!Object.keys(req.body).length) {
                return res.status(400).json({ message: 'El cuerpo de la solicitud está vacío.' })
            }
            const existingTaxi = await taxiByIdService(+id);
            if (!existingTaxi) {
                return res.status(404).json({ message: 'No se ha encontrado un taxi con este ID' });
            }
            const taxi = await updateTaxiService(+id,req.body)

            return res.status(200).json(taxi);

        } catch (error: any) {
            return res.status(500).json({ message: error.message })
        }
    },
    deleteByTaxi: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
    
            const existingTaxi = await taxiByIdService(+id);
            if (!existingTaxi) {
                return res.status(404).json({ message: 'No se ha encontrado un taxi con este ID' });
            }
            const taxi = await deleteTaxiService(id)
            return res.status(200).json({ message: 'Se ha eliminado correctamente el Taxi', taxi: taxi });
        } catch (error:any) {
            return res.status(500).json({ message: error.message })
        }
    },
}
