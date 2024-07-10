import type { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {

    let { q, p } = req.query;
    const validateNumber = Number(p);

    if (!q) return res.status(400).json({ error: 'query.not.found' });
    if (!validateNumber || validateNumber < 1) p = "1";

    req.query.p = p

    next()
}