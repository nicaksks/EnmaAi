import type { NextFunction, Request, Response } from "express";

export default async (req: Request, _: Response, next: NextFunction) => {

    let day = Number(req.query.d) || 0;

    if (day < 0 || day > 6) day = 0;

    req.query.d = String(day);

    next()
}