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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const config_class_1 = require("../config/config.class");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("../router"));
const api_error_function_1 = require("../middlewares/api-error.function");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.PORT = +new config_class_1.Config().get('DEV_PORT');
        this.setMiddlewares();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.app.listen(this.PORT, "0.0.0.0", () => {
                    console.log(`Server started on PORT ${this.PORT}`);
                });
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
    setMiddlewares() {
        this.app.disable('x-powered-by');
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use('/api', router_1.default);
        this.app.use(api_error_function_1.APIErrorMiddleware);
    }
}
exports.App = App;
