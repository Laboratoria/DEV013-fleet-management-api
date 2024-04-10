// import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import prisma from "../db";

// const taxisClient = new PrismaClient().taxis;

// getTaxis
export const TaxisController = {
    // getAllTaxis
    getAllTaxis: async (req: Request, res: Response) => {
        try {
            const { skip, take } = req.query;
            const allTaxis = await prisma.taxis.findMany({
                skip: skip ? Number(skip) : undefined,
                take: take ? Number(take) : undefined
            });
            return res.status(200).json(allTaxis);
        } catch (error: any) {
            return res.status(500).json({ message: error.message })
        }
    },
    // getLocationHistory
    getLocationHistory: async (req: Request, res: Response) => {
        try {
            const { skip, take } = req.query;
            const locationHistory = await prisma.taxis.findMany({
                skip: skip ? Number(skip) : undefined,
                take: take ? Number(take) : undefined,
                where: {
                    Trajectories: {
                        some: {} // Verifica si hay al menos una trayectoria asociada
                    }
                },
                include: {
                    // taxis:{
                    //     select:{
                    //         id:true
                    //     }
                    // },
                    // taxiId: true,
                    // date: true,
                    // latitude: true,
                    // longitude: true,
                    
                    Trajectories:{
                        select:{
                            latitude: true,
                            longitude: true,
                            date: true
                        }
                    }
                }
            })
            return res.status(200).json(locationHistory);
        } catch (error: any) {
            return res.status(500).json({ message: error.message })
        }
    },
    getLastLocation: async (req: Request, res: Response) => {
        try {
            const lastLocation = await prisma.taxis.findMany({});
            return res.status(200).json(lastLocation);

        } catch (error:any) {
            return res.status(500).json({ message: error.message })
        }
    }
}
