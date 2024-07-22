import express from 'express';
import sub from './sub';

export default express()
    .use('/api', sub)
