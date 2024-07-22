import type { Request, Response } from 'express';
import Path from '@src/decorators/Path';
import LastReleases from '@src/services/anroll/LastReleases';
import Search from '@src/services/anroll/Search';
import anime from '@src/utils/anime';
import Calendar from '@src/services/anroll/Calendar';
import days from '@src/controllers/days';
import query from '@src/controllers/query';
import params from '@src/controllers/params';
import path from 'node:path';
import Download from '@src/services/anroll/Download';
import imageFormat from '@src/utils/imageFormat';

export default class Animes {

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

    @Path('get', '/episode/:anime/:episode', params)
    static async episode(req: Request, res: Response) {
        try {
            const { anime, episode } = req.params;
            await Download.specificEpisode(anime, episode);
            res.status(200).sendFile(path.join(__dirname, `../../../assets/${anime}/${episode}.m3u8`))
        } catch (e: any) {
            res.status(e?.statusCode ?? 404).json({ error: e?.message ?? 'anime.not.found' });
        }
    }

    @Path('get', '/images/:slug/:episode')
    static async images(req: Request, res: Response) {
        const { slug, episode } = req.params;
        res.status(200).redirect(`https://static.anroll.net/images/animes/screens/${slug}/${imageFormat(episode)}`);
    }

    @Path('get', '/images/:type/thumbnail/:slug')
    static async thumbnail(req: Request, res: Response) {
        const { type, slug } = req.params;
        res.status(200).redirect(`https://static.anroll.net/images/${type}/capas/${imageFormat(slug)}`);
    }
}
