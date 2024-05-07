import fs from 'fs/promises';

export const writeData = async (dataFilePath: any, data: any) => {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}



