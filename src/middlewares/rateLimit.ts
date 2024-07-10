import rateLimit from 'express-rate-limit';

export default (limit: number = 10) => {
    return rateLimit({
        windowMs: seconds(),
        limit,
        skipFailedRequests: true,
        statusCode: 429,
        message: {
            error: {
                code: 429,
                message: 'rate.limit'
            }
        }
    })
}

function seconds(s: number = 1): number {
    return s * 1000
}