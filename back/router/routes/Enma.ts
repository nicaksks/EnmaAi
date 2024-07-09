import type { Request, Response } from 'express';
import Path from '@back/decorators/Path';
import LastReleases from '@back/services/LastReleases';
import Search from '@back/services/Search';
import anime from '@back/utils/anime';
import Calendar from '@back/services/Calendar';
import days from '@back/controllers/days';
import query from '@back/controllers/query';

export default class Enma {

    @Path('get', '/anime', query)
    static async anime(req: Request, res: Response) {
        try {
            const { q, p } = req.query;
            const data = await anime(q!.toString(), Number(p));
            res.status(200).json(data)
        } catch (e: any) {
            res.status(e.statusCode).json({ error: e.message });
        }
    }

    @Path('get', '/release')
    static async release(_: Request, res: Response) {
        const data = await LastReleases.catalog();
        res.status(200).json({ data })
    }

    @Path('get', '/search', query)
    static async search(req: Request, res: Response) {
        try {
            const q = req.query?.q as string;
            const data = await Search.get(q)
            res.status(200).json({ data })
        } catch (e: any) {
            res.status(e.statusCode).json({ error: e.message });
        }
    }

    @Path('get', '/calendar', days)
    static async calendar(req: Request, res: Response) {
        try {
            const data = await Calendar.get(Number(req.query.d))
            res.status(200).json({ data })
        } catch (e: any) {
            res.status(e.statusCode).json({ error: e.message });
        }
    }
}
