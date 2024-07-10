import express, { urlencoded, type Application } from 'express';
import cors from './middlewares/cors';
import rateLimit from './middlewares/rateLimit';
import router from './router/group';

class App {

    public _app: Application;

    constructor() {
        this._app = express()
        this.proxy().middlewares().group()
    }
    
    private proxy(): this {
        this._app.set('trust proxy', 1)
        return this;
    }

    private middlewares(): this {
        this._app.use(cors)
        this._app.use(rateLimit())
        this._app.use(express.json());
        this._app.use(urlencoded({ extended: false }))
        return this;
    }
    
    private group(): this {
        this._app.use(router)
        return this;
    }

}

export default new App()._app