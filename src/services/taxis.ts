import prisma from "../utils/db";

export const allTaxisService = async (skip: number, take: number): Promise<any> => {
    try {
        const allTaxis = await prisma.taxis.findMany({
            skip: skip,
            take: take,
        });
        return allTaxis;
    } catch (error: any) {
        return 'Error al obtener taxis desde la BD';
    }
};

export const taxiByIdService = async (id:string): Promise<any> => {
    try {
        const taxiId = parseInt(id);
        if (isNaN(taxiId)) {
            return null;
        }
        const getId = await prisma.taxis.findUnique({
            where: {
                id: taxiId
            }
        });
        return getId;
    } catch (error: any) {
        throw new Error("Error al buscar el taxi en la base de datos");
    }
};

export const createTaxiService = async (id: number, plate: string): Promise<any> => {
    try {
        if(id <= 0){
            throw new Error("El ID del taxi debe ser un número positivo");
        }

        const regexPlate = /^[A-Z]{3}-\d{4}$/gm; 
        if(!regexPlate.test(plate)){
            throw new Error('El formato de la placa es incorrecto');
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

export  const updateTaxiService = async (id: string, update:any):Promise<any> => {
    try {
        const taxiId = parseInt(id);
        const updateTaxi = await prisma.taxis.update({
            where: { id: taxiId },
            data: update
        });
        return updateTaxi;
    } catch (error) {
        throw new Error("Error al actualizar el taxi en la base de datos");
    }
}


