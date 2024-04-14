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

                    Trajectories: {
                        select: {
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
            const lastLocation = await prisma.$queryRaw`
            SELECT tax.id, tra.date, tra.latitude, tra.longitude
            FROM "Taxis" tax
            INNER JOIN (
              SELECT taxi_id, date, latitude, longitude,
                     ROW_NUMBER() OVER (PARTITION BY taxi_id ORDER BY date DESC) AS row_num
              FROM "Trajectories"
            ) AS tra ON tax.id = tra.taxi_id AND tra.row_num = 1;
          `;
            return res.status(200).json(lastLocation);

        } catch (error: any) {
            return res.status(500).json({ message: error.message })
        }
    },
    getTaxiById: async (req: Request, res: Response) => {
        const { id } = req.params;
        const taxiId = parseInt(id);
        const getId = await prisma.taxis.findUnique({
            where: {
                id: taxiId
            }
        });
        if (!getId) res.status(404).json({ message: 'El id del taxi no se encontro' });
        else return res.status(200).json(getId);
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
            return res.status(500).json({ message: error.message })
        }
    },
}
