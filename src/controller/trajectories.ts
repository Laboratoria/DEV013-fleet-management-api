import type { Request, Response } from "express";
import prisma from "../db";

export const TrajectoriesController = {
    getAllTrajectories: async (req: Request, res: Response) => {
        try {
            const { skip, take } = req.query;
            const trajectories = await prisma.trajectories.findMany({
                skip: skip ? Number(skip) : undefined,
                take: take ? Number(take) : undefined,
            });
            return res.status(200).json(trajectories);
        } catch (error: any) {
            return res.status(500).json({ message: error.message })
        }
    },
    getTrajectoriesCount: async (req: Request, res: Response) => {
        try {
            const countTrajectories = await prisma.trajectories.groupBy({
                by: ['taxiId'],
                _count: {
                    taxiId: true,
                }
            });

            return  res.status(201).json(countTrajectories);
        } catch (error:any) {
            return res.status(500).json({ message: error.message })
        }

    },
    getTrajectoriesById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const trajectory = await prisma.trajectories.findUnique({ where: { id: parseInt(id) }});    
            if (!trajectory) {
                return res.status(404).json({ message: 'El id de la trayectoria no se encontro' });
            }                        
            return res.status(200).json(trajectory);
        } catch (error:any) {
            return res.status(500).json({ message: error.message })
        }
    },
    postTrajectories: async (req: Request, res: Response) => {
        try {
            const {id, latitude, longitude, taxi_id} = req.body;

            const currentTime = new Date();
            const newTrajectories =  await prisma.trajectories.create({
                data:{
                    id, latitude, longitude , taxiId: taxi_id, date:currentTime
                }
            });
            return res.status(201).json(newTrajectories);
        } catch (error:any) {
            return res.status(500).json({ message: error.message })
        }
    },
    putTrajectoryById: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            if(!Object.keys(req.body).length){
                return res.status(400).json({mesage:"El cuerpo de la solicitud está vacío"});  
            }
            const existingTrajectories = await prisma.trajectories.findUnique({where:{id:parseInt(id)}});
            if(!existingTrajectories){
                return res.status(404).json({ message: 'No se ha encontrado una trayectoria con este ID' });
            }
            const updateTrajectories = await prisma.trajectories.update({where:{id:parseInt(id)},data:req.body});
            return res.status(200).json(updateTrajectories);
        } catch (error:any) {
            return res.status(500).json({message:'Error en el servidor'})
            
        }
    },
    deleteTrajectoriesById: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const existingTrajectories = await prisma.trajectories.findUnique({where:{id:parseInt(id)}});
            if (!existingTrajectories) {
                return res.status(404).json({ message: "La trayectoria no existe." });
            } else {
                await prisma.trajectories.delete({ where: { id: parseInt(id) } });
                return res.status(200).json({ message: "Trayectoria eliminada correctamente." });
            }
        } catch (error) {
            return res.status(500).json({message:'Error en el servidor'})
        }
    },
}