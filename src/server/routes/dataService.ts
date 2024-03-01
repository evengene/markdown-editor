import path from "node:path";
import fs from "fs/promises";


const dataFilePath = path.join(__dirname, '..', '..', 'data.json');

export const readData = async () => {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
}

export const writeData = async ( dataFilePath: any, data: any ) => {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}



