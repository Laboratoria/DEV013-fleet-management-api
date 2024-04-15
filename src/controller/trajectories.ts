import type { Request, Response } from "express";
import prisma from "../db";

export const TrajectoriesController = {
    getAllTrajectories: async (req: Request, res: Response) =>{
        try {
            const trajectories = await prisma.trajectories.findMany();
            return res.status(200).json(trajectories);
        } catch (error:any) {
            return res.status(500).json({ message: error.message })
        }
    },
}