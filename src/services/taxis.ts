import prisma from "../utils/db";

export const AllTaxisService = async (skip: number, take: number): Promise<any> => {
    try {
        const allTaxis = await prisma.taxis.findMany({
            skip: skip,
            take: take,
        });
        return allTaxis;
    } catch (error: any) {
        return 'Error al obtener taxis desde la BD';
    }
}

export const TaxiByIdService = async(id:string): Promise<any> => {
    try {
        const taxiId = parseInt(id);
        if(isNaN(taxiId)){
            return null;
        }
        const getId = await prisma.taxis.findUnique({
            where: {
                id: taxiId
            }
        });
        return getId;
    } catch (error:any) {
        throw new Error("Error al buscar el taxi en la base de datos");
    }
}
