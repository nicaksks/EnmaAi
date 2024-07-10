import { type Request, type Response, type NextFunction, Router, type RequestHandler } from 'express';

type methods = 'get' | 'post' | 'put' | 'delete' | 'patch';

export default (method: methods, path: string, ...middlewares: RequestHandler[]) => {
    return (target: any, key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const original = descriptor.value;
        descriptor.value = function (req: Request, res: Response, next: NextFunction): any {
            const router = Router();
            router[method](path, ...middlewares, (req: Request, res: Response) => original.apply(this, [req, res]));
            return router(req, res, next);
        };
        return descriptor;
    };
};