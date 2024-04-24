import {AllTaxisService,TaxiByIdService} from '../src/services/taxis';

jest.mock('@prisma/client',() =>{
    const mockPrisma = {
        taxis:{
            findMany:jest.fn().mockResolvedValue([
                {id:1,plate:'Taxi 1'},
                {id:2,plate:'Taxi 2'}
            ]),
            findUnique: jest.fn().mockResolvedValue([{ id: 3, plate: 'Taxi 3' }])
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

        const result = await AllTaxisService(skip,take);

        expect(result).toEqual([
            { id: 1, plate: 'Taxi 1' },
            { id: 2, plate: 'Taxi 2' }
        ]);

    });
});
describe('getTaxiById',() =>{
    it('return taxi by Id',async() =>{
        const taxiId = '3';

        const result = await TaxiByIdService(taxiId);

        expect(result).toEqual([
            { id: 3, plate: 'Taxi 3' }
        ]);

    });

    it('return null when an invalid taxiId is provided',async() =>{
        const taxiId = 'holacomoestas';

        const result = await TaxiByIdService(taxiId);
        console.log("🚀 ~ it ~ result:", result)

        expect(result).toBeNull();

    });
})