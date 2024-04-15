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

        } catch (error) {
            
        }
    },
    postTrajectories: async (req: Request, res: Response) => {

    },
    putTrajectoryById: async (req: Request, res: Response) => {

    },
    deleteTrajectoriesById: async (req: Request, res: Response) => {

    },
}