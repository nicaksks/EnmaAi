export default class EnmaError extends Error {
    constructor(public statusCode: number = 500, public message: string = 'unknown') {
        super(message)
    }
}