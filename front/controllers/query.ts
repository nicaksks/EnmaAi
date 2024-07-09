import type { NextFunction, Request, Response } from "express";
import slug from "@back/utils/slug";
import episode from "@back/utils/episode";
import download from "@front/middlewares/download";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const q = req.query?.q as string;
        let e = Number(req.query.e) || 1;

        if (!q) return res.status(404).render('error', { error: 'QUERY NOT FOUND' })
        if (e < 1) e = 1;

        await download(q, e);

        req.query.url = `${slug(q)}/${episode(e)}.m3u8`;

        next()
    } catch (e: any) {
        return res.status(e.statusCode).render('error', { error: e.message })
    }
}