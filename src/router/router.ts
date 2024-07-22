import express from 'express';
import Animes from './routes/Animes';
import Mangas from './routes/Mangas';
import Error from './routes/Error';

const router = express();

export const anime = router
    .use(Animes.release)
    .use(Animes.images)
    .use(Animes.thumbnail)
    .use(Animes.calendar)
    .use(Animes.search)
    .use(Animes.anime)
    .use(Animes.episode)
    .use(Error.notfound)


export const manga = router
    .use(Mangas.home)