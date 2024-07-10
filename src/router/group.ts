import express from 'express';
import router from './router';

export default express()
    .use('/api', router)
