// node upload-gps-data.js <path-to-files>
// --type=taxis|trajectories
// --dbname=<dbname>
// --host=<hostname>
// --port=<port>
// --username=<username>
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
// import inquirer from 'inquirer';

// console.log(process.argv[3]);

// const files = fs.readdirSync(process.argv[2]) 
// console.log("🚀 ~ files:", files)

// const readFiles = fs.readFileSync("F:\\Proyectos.Laboratoria\\DEV013-fleet-management-api\\data\\taxi\\taxi1.txt",'utf-8')
// console.log("🚀 ~ readFiles:", readFiles)

async function createModel() {
    const prisma = new PrismaClient();

    const args = process.argv.slice(2);
    console.log("🚀 ~ createModel ~ args:", args)
    // const folderPath = args[0];
    // console.log("🚀 ~ createModel ~ folderPath:", folderPath)
    // const type = args[1]
    // console.log("🚀 ~ createModel ~ type:", type)
    // const files = fs.readdirSync(folderPath);
    // console.log("🚀 ~ createModel ~ files:", files)
    let folderPath, type;
    for (const arg of args) {
        if (arg.startsWith('--type=')) {
            type = arg.split('=')[1]; // Extraer solo el valor del tipo
        } else {
            folderPath = arg;
        }
    }

    const folderToProcess = path.join(folderPath, type);
    console.log("🚀 ~ createModel ~ folderToProcess:", folderToProcess)
    const files = fs.readdirSync(folderToProcess);
    console.log("🚀 ~ createModel ~ files:", files)
    for (const file of files) {
        console.log("🚀 ~ createModel ~ file:", file)
        if (!file.endsWith('.txt')) {
            continue;
        }
        const filePath = path.join(folderToProcess, file);
        console.log("🚀 ~ createModel ~ filePath:", filePath)

        const readFiles = fs.readFileSync(filePath, 'utf-8');
        // console.log("🚀 ~ createModel ~ readFiles:", readFiles);
        const lines = readFiles.split('\n').map(line => line.trim()).filter(Boolean);
        // console.log("🚀 ~ createModel ~  lines :",  lines )
        for (const line of lines) {
            const [field1, field2, field3, field4] = line.split(',');

            if (type === 'taxis') {
                await prisma.taxis.create({
                    data: {
                        id: parseInt(field1),
                        plate: field2
                    }
                });
            } else if (type === 'trajectories') {
                await prisma.trajectories.create({
                    data: {
                        taxiId: parseInt(field1),
                        date: new Date(field2),
                        latitude: parseFloat(field3),
                        longitude: parseFloat(field4)
                    }
                });
            }
        }

    }
    console.log("All lines processed successfully.");
}


createModel()

