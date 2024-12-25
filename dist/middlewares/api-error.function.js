"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIErrorMiddleware = void 0;
const api_error_class_1 = require("../exceptions/api-error.class");
function APIErrorMiddleware(err, req, res, next) {
    if (err instanceof api_error_class_1.ApiError) {
        res.status(err.status).send({
            message: err.message || '',
            errors: err.errors
        });
    }
    res.status(500).send();
}
exports.APIErrorMiddleware = APIErrorMiddleware;
