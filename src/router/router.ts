import express from 'express';
import Enma from './routes/Enma';
import Error from './routes/Error';

export default express()
    .use(Enma.release)
    .use(Enma.calendar)
    .use(Enma.search)
    .use(Enma.anime)
    .use(Enma.episode)
    .use(Error.notfound)