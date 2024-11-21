import {ApiError} from "../exceptions/api-error.class";
import {NextFunction, Request, Response} from "express";

export function APIErrorMiddleware(err: ApiError | Error, req: Request, res: Response, next: NextFunction){
    if (err instanceof ApiError){
        res.status(err.status).send({
            message: err.message || '',
            errors: err.errors
        })
    }
    res.status(500).send()
}