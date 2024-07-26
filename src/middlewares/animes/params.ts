import setEpisode from "@src/utils/setEpisode";
import slug from "@src/utils/slug";
import type { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {

    let { anime, episode } = req.params;
    const validateNumber = Number(episode);

    if (!anime) return res.status(400).json({ error: 'params.not.found' });
    if (!validateNumber || validateNumber < 1) episode = "1";

    req.params.anime = slug(anime);
    req.params.episode = setEpisode(Number(episode));
    res.setHeader('Content-Disposition', `attachment; filename="${setEpisode(Number(episode))}.m3u8"`)

    next()
}