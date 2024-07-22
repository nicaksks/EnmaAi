import express from 'express';
import { anime, manga } from '../router';

export default express()
    .use('/animes', anime)
    .use('/mangas', manga)