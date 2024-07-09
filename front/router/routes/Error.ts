import type { Request, Response } from 'express';
import Path from '@back/decorators/Path';

export default class Error {
    
    @Path('get', '*')
    static async notfound(_: Request, res: Response) {
        res.status(404).render('notfound')
    }
}