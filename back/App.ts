import express, { urlencoded, type Application } from 'express';
import cors from './middlewares/cors';
import rateLimit from './middlewares/rateLimit';
import front from '@front/router/group';
import back from './router/group';

class App {

    public _app: Application;
    private _swagger: any;

    constructor() {
        this._app = express()
        this.middlewares().ejs().group()
    }
    
    private middlewares(): this {
        this._app.use(cors)
        this._app.use(rateLimit())
        this._app.use(express.json());
        this._app.use(urlencoded({ extended: false }))
        return this;
    }
    
    private ejs(): this {
        this._app.set('view engine', 'ejs')
        return this;
    }

    private group(): this {
        this._app.use(back)
        this._app.use(front)
        return this;
    }

}

export default new App()._app