import type { NextFunction, Request, Response } from "express";

export default async (_: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', 'GET');
    res.setHeader('Access-Control-Allow-Credentials', 'false');
    next();
}