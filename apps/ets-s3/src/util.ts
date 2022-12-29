import fs from 'fs';
import multer from 'multer';
import { PrismaClient } from '.prisma/client';

export function checkPublicDir() {
    fs.access('./public', (error) => {
        if (error) {
            fs.mkdirSync('./public')
        }
    })

    fs.access('./public/images', (error) => {
        if (error) {
            fs.mkdirSync('./public/images', { recursive: true })
        }
    })
}

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const prisma = new PrismaClient();