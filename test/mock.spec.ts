import {allTaxisService,createTaxiService,taxiByIdService} from '../src/services/taxis';

jest.mock('@prisma/client',() =>{
    const mockPrisma = {
        taxis:{
            findMany:jest.fn().mockResolvedValue([
                {id:1,plate:'Taxi 1'},
                {id:2,plate:'Taxi 2'}
            ]),
            findUnique: jest.fn().mockResolvedValue([{ id: 3, plate: 'Taxi 3' }]),
            create: jest.fn().mockResolvedValue({ id: 4, plate: 'CNCA-0000' }),
        },
    };
    return {
        PrismaClient: jest.fn(() => mockPrisma),
    }
})

describe('getAllTaxis',() =>{
    it('return all taxis',async() =>{
        const skip = 2;
        const take = 4;

        const result = await allTaxisService(skip,take);

        expect(result).toEqual([
            { id: 1, plate: 'Taxi 1' },
            { id: 2, plate: 'Taxi 2' }
        ]);

    });
});

describe('getTaxiById',() =>{
    it('return taxi by Id',async() =>{
        const taxiId = '3';

        const result = await taxiByIdService(taxiId);

        expect(result).toEqual([
            { id: 3, plate: 'Taxi 3' }
        ]);

    });

    it('return null when an invalid taxiId is provided',async() =>{
        const taxiId = 'holacomoestas';

        const result = await taxiByIdService(taxiId);
        console.log("🚀 ~ it ~ result:", result)

        expect(result).toBeNull();

    });
})

describe('postTaxi',() =>{
    it('create new taxi',async() =>{

        const id = 4;
        const plate = 'CNCA-0000';
        const newTaxi = {
            id:4,
            plate:'CNCA-0000', 
        };

        const result = await createTaxiService(id, plate);
        console.log("🚀 ~ it ~ resul3t:", result)

        expect(result).toEqual(newTaxi);
    })
})