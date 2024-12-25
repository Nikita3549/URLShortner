"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLController = void 0;
const api_error_class_1 = require("../../exceptions/api-error.class");
const URLService_class_1 = require("../../service/URLService/URLService.class");
class URLController {
    createAndSaveShortenURL(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fullUrl, shortenUrl } = req.body;
                if (typeof fullUrl != 'string' || typeof shortenUrl !== 'string') {
                    throw api_error_class_1.ApiError.BadRequest();
                }
                if (yield new URLService_class_1.URLService().doesShortenURLAlreadyExist(shortenUrl)) {
                    throw api_error_class_1.ApiError.Conflict('This name is already reserved');
                }
                yield new URLService_class_1.URLService().saveShortenURL(shortenUrl, fullUrl);
                res.status(200).setHeader('content-type', 'text/plain').send(shortenUrl);
            }
            catch (e) {
                console.log(e);
                next(e);
            }
        });
    }
    redirectToFullURLByShorten(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fullUrl = yield new URLService_class_1.URLService().findFullURLByShorten(req.params.shortenUrl);
                res.redirect(fullUrl, 308);
            }
            catch (e) {
                console.log(e);
                next(e);
            }
        });
    }
    getShortenURlByFull(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fullUrl } = req.params;
                const shortenUrl = yield new URLService_class_1.URLService().findShortenURLByFull(fullUrl);
                if (!shortenUrl) {
                    throw api_error_class_1.ApiError.BadRequest();
                }
                res.status(200).setHeader('content-type', 'text/plain').send(shortenUrl);
            }
            catch (e) {
                console.log(e);
                next(e);
            }
        });
    }
}
exports.URLController = URLController;
