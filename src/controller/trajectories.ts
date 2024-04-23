import type { Request, Response } from "express";
import prisma from "../db";
const xl = require('excel4node');

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
                _count: true,
            });

            return res.status(201).json(countTrajectories);
        } catch (error: any) {
            return res.status(500).json({ message: error.message })
        }

    },
    getLocationHistory: async (req: Request, res: Response) => {
        try {
            const { date } = req.query;
            const { id } = req.params;
            const endDate = new Date(date as string);
            endDate.setDate(endDate.getDate() + 1);
            const locationHistory = await prisma.trajectories.findMany({
                where: {
                    taxiId: parseInt(id), // Convertir a número si es necesario
                    date: {
                        gte: new Date(date as string),
                        lt: endDate
                    },
                },
                select: {
                    latitude: true,
                    longitude: true,
                    date: true,
                },
            })
            return res.status(200).json(locationHistory);
        } catch (error: any) {
            return res.status(500).json({ message: error.message })
        }
    },
    getTrajectoriesById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const trajectory = await prisma.trajectories.findUnique({ where: { id: parseInt(id) } });
            if (!trajectory) {
                return res.status(404).json({ message: 'El id de la trayectoria no se encontro' });
            }
            return res.status(200).json(trajectory);
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
    postTrajectories: async (req: Request, res: Response) => {
        try {
            const { id, latitude, longitude, taxi_id } = req.body;

            const currentTime = new Date();
            const newTrajectories = await prisma.trajectories.create({
                data: {
                    id, latitude, longitude, taxiId: taxi_id, date: currentTime
                }
            });
            return res.status(201).json(newTrajectories);
        } catch (error: any) {
            return res.status(500).json({ message: error.message })
        }
    },
    putTrajectoryById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!Object.keys(req.body).length) {
                return res.status(400).json({ mesage: "El cuerpo de la solicitud está vacío" });
            }
            const existingTrajectories = await prisma.trajectories.findUnique({ where: { id: parseInt(id) } });
            if (!existingTrajectories) {
                return res.status(404).json({ message: 'No se ha encontrado una trayectoria con este ID' });
            }
            const updateTrajectories = await prisma.trajectories.update({ where: { id: parseInt(id) }, data: req.body });
            return res.status(200).json(updateTrajectories);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error en el servidor' })

        }
    },
    deleteTrajectoriesById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const existingTrajectories = await prisma.trajectories.findUnique({ where: { id: parseInt(id) } });
            if (!existingTrajectories) {
                return res.status(404).json({ message: "La trayectoria no existe." });
            } else {
                await prisma.trajectories.delete({ where: { id: parseInt(id) } });
                return res.status(200).json({ message: "Trayectoria eliminada correctamente." });
            }
        } catch (error: any) {
            return res.status(500).json({ message: 'Error en el servidor' })
        }
    },

    getExportExcel: async (req: Request, res: Response) => {
        try {
            const { taxiId, date } = req.query;
            const endDate = new Date(date as string);
            endDate.setDate(endDate.getDate() + 1);
            const findPlate = await prisma.taxis.findFirst({
                where: {
                    plate: taxiId as string,
                },
                select: {
                    id: true,
                }
            });
            console.log("🚀 ~ getExportExcel:async ~ findPlate:", findPlate)
            const taxi = findPlate?.id
            const location = await prisma.trajectories.findMany({
                where: {
                    taxiId: taxi,
                    date: {
                        gte: new Date(date as string),
                        lt: endDate,
                    },
                },
            });
            // console.log("🚀 ~ getExportExcel:async ~ location:", location)
            // return res.status(200).json(location);
            const workbook = new xl.Workbook();
            const nameFile = "vehicle location " + taxiId;
            const excelLocation = workbook.addWorksheet(nameFile);

            const style = workbook.createStyle({
                font: {
                    name: 'Arial',
                    color: '#000000',
                    size: 12
                },
                fill: {
                    type: 'pattern',
                    patternType: 'solid',
                    fgColor: '#A9D08E',
                },
                border: { 
                    left: { style: 'thin', color: 'black' },
                    right: { style: 'thin', color: 'black' },
                    top: { style: 'thin', color: 'black' },
                    bottom: { style: 'thin', color: 'black' },
                },
            });

            excelLocation.cell(1, 1).string('Trajectories_id').style(style);
            excelLocation.cell(1, 2).string('Taxi_Id').style(style);
            excelLocation.cell(1, 3).string('Date').style(style);
            excelLocation.cell(1, 4).string('Latitude').style(style);
            excelLocation.cell(1, 5).string('Longitude').style(style);
            location.forEach((l, index) => {
                excelLocation.cell(index + 2, 1).number(l.id);
                excelLocation.cell(index + 2, 2).number(l.taxiId);
                excelLocation.cell(index + 2, 3).date(l.date);
                excelLocation.cell(index + 2, 4).number(l.latitude);
                excelLocation.cell(index + 2, 5).number(l.longitude);
            });

            const buffer = await workbook.writeToBuffer();

            res.setHeader('Content-Type', 'application/vnd.ms-excel');
            res.setHeader('Content-Disposition', `attachment; filename=${nameFile}.xlsx`);
            res.send(buffer);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error en el servidor' })
        }
    }
}