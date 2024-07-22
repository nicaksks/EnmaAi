import type { Request, Response } from 'express';
import Path from '@src/decorators/Path';

export default class Mangas {
    @Path('get', '/')
    static async home(req: Request, res: Response) {
        res.status(200).json({
            message: 'Hello, Manga!'
        })
    }
}