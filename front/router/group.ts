import express from 'express';
import Home from './routes/Home';
import Error from './routes/Error';

export default express()
    .use('/episode', express.static('assets'))
    .use(Home.index)
    .use(Error.notfound)