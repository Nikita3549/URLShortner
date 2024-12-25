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
exports.URLService = void 0;
const database_object_1 = require("../../database/database.object");
const api_error_class_1 = require("../../exceptions/api-error.class");
class URLService {
    doesShortenURLAlreadyExist(shortenURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_object_1.database.sendQuery(`SELECT * FROM url WHERE short_url = '${shortenURL}';`);
            return !!res;
        });
    }
    saveShortenURL(shortenURL, fullUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_object_1.database.sendQuery(`INSERT INTO url VALUES('${shortenURL}', '${fullUrl}');`);
        });
    }
    findShortenURLByFull(fullURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_object_1.database.sendQuery(`SELECT short_url FROM url WHERE full_url = '${fullURL}';`);
            if (!res || !(res === null || res === void 0 ? void 0 : res.short_url)) {
                throw api_error_class_1.ApiError.BadRequest();
            }
            return res.short_url;
        });
    }
    findFullURLByShorten(shortenURL) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield database_object_1.database.sendQuery(`SELECT full_url FROM url WHERE short_url = '${shortenURL}';`);
            if (!res || !(res === null || res === void 0 ? void 0 : res.full_url)) {
                throw api_error_class_1.ApiError.BadRequest();
            }
            return res.full_url;
        });
    }
}
exports.URLService = URLService;
