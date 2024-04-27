import { group } from 'console';
import { allTrajectoriesServices,countTrajectoriesService, locationService } from '../src/services/trajectories'

jest.mock('@prisma/client', () => {
    const mockPrisma = {
        trajectories: {
            findMany: jest.fn().mockResolvedValue([
                { id: 1, taxiId: 23, date: '2008-02-02 14:22:40', latitude: 116.30508, longitude: 39.96525 },
                { id: 2, taxiId: 24, date: '2008-02-06 14:22:40', latitude: 116.30509, longitude: 39.86525 }
            ]),
            groupBy: jest.fn().mockResolvedValue([
                {_count: 1138,taxiId: 10133},
                {_count: 1701,taxiId: 6598},
            ])
        },
    };
    return {
        PrismaClient: jest.fn(() => mockPrisma),
    }
})

describe('getAllTrajectories', () => {
    it('return all trajectories', async () => {
        const skip = 1;
        const take = 2;

        const result = await allTrajectoriesServices(skip,take);
        expect(result).toEqual([
            { id: 1, taxiId: 23, date: '2008-02-02 14:22:40', latitude: 116.30508, longitude: 39.96525 },
            { id: 2, taxiId: 24, date: '2008-02-06 14:22:40', latitude: 116.30509, longitude: 39.86525 }
        ]);

    });
});
describe('getCounTrajectories', () => {
    it('return taxi by Id', async () => {

        const result = await countTrajectoriesService();

        expect(result).toEqual([
            {_count: 1138,taxiId: 10133},
            {_count: 1701,taxiId: 6598},
        ]);

    });
});

describe('getLocation',() =>{
    it('return location history  of a specific taxi',async ()=>{
        const taxiId=1013;
        const date = new Date('2022-04-01');
        const result = await locationService(taxiId,date);
        expect(result).toEqual([
            { id: 1, taxiId: 23, date: '2008-02-02 14:22:40', latitude: 116.30508, longitude: 39.96525 },
            { id: 2, taxiId: 24, date: '2008-02-06 14:22:40', latitude: 116.30509, longitude: 39.86525 }
        ]);
    })
})

describe('getLastLocation',() =>{
    
})

describe('getByTrajectory',() =>{
    
})

