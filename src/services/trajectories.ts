import prisma from "../utils/db";

export const allTrajectoriesServices = async (skip: number, take: number): Promise<any> => {
    try {
        const trajectories = await prisma.trajectories.findMany({
            skip: skip,
            take: take,
        });
        return trajectories;
    } catch (error) {
        return 'Error al obtener trayectorias desde la BD';
    }
}