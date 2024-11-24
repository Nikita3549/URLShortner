import {IApiError} from "./api-error.interface";

export class ApiError extends Error implements IApiError{
    status: number
    errors: TErrors
    constructor( status: number, message?: string, errors: TErrors = []) {
        !!message ? super(message) : super()
        this.status = status
        this.errors = errors
    }
    static BadRequest(message?: string, errors: TErrors = []): ApiError{
        return new ApiError(400, message, errors)
    }
    static Conflict(message?: string, errors: TErrors = []): ApiError{
        return new ApiError(409, message, errors)
    }
}
type TErrors = [unknown] | []