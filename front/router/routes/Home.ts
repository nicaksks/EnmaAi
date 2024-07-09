import type { Request, Response } from 'express';
import Path from '@back/decorators/Path';
import query from '@front/controllers/query';

export default class Home {
    @Path('get', '/', query)
    static async index(req: Request, res: Response) {
        try {
            res.status(200).render('index', { url: req.query.url! as string })
        } catch (e: any) {
            res.render('error', { error: e.message })
        }
    }
}
