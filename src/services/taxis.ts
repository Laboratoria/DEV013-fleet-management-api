import prisma from "../utils/db";

export const allTaxisService = async (skip: number, take: number): Promise<ITaxi[]> => {
    const allTaxis = await prisma.taxis.findMany({
        skip: skip,
        take: take,
    });
    return allTaxis;
};

export const taxiByIdService = async (id: number): Promise<any> => {
    try {
        const getId = await prisma.taxis.findUnique({
            where: {
                id: id
            }
        });
        return getId;
    } catch (error: any) {
        throw new Error("Error al buscar el taxi en la base de datos");
    }
};

export const createTaxiService = async (id: number, plate: string): Promise<any> => {
    try {
        if (id <= 0) {
            throw new Error("El ID del taxi debe ser un número positivo");
        }

        const newTaxi = await prisma.taxis.create({
            data: {
                id, plate
            }
        });
        return newTaxi;

    } catch (error) {
        throw new Error("Error al crear un nuevo taxi en la base de datos");
    }
};

export const updateTaxiService = async (id: number, update: any): Promise<any> => {
    try {
        const updateTaxi = await prisma.taxis.update({
            where: { id: id },
            data: update
        });
        return updateTaxi;
    } catch (error) {
        throw new Error("Error al actualizar el taxi en la base de datos");
    }
};

export const deleteTaxiService = async (id: string): Promise<any> => {
    try {
        const taxiId = parseInt(id);
        const deleteTaxi = await prisma.taxis.delete({ where: { id: taxiId } });
        return deleteTaxi;
    } catch (error) {
        throw new Error("Error al eliminar taxi en la base de datos");
    }
}

export interface ITaxi {
    id: number
    plate: string | null
}

export interface IPaginated {
    skip?: number
    take?: number
}

