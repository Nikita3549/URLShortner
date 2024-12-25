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
exports.database = void 0;
const pg_1 = require("pg");
const config_class_1 = require("../config/config.class");
class Database {
    constructor() {
        this.config = new config_class_1.Config();
        this.pool = new pg_1.Pool({
            user: this.config.get('DATABASE_USER'),
            password: this.config.get('DATABASE_PASSWORD'),
            host: this.config.get('DATABASE_HOST'),
            port: +this.config.get('DATABASE_PORT'),
            database: this.config.get('DATABASE_DBNAME')
        });
    }
    sendQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query) {
                throw new Error('Query to database is empty');
            }
            return (yield this.pool.query(query)).rows[0];
        });
    }
}
exports.database = new Database();
// import {IDatabase} from "./database.interface";
// import {Pool, QueryResult} from "pg";
// import {Config} from "../env/config.class";
//
// class Database implements IDatabase{
//     private pool: Pool
//     private config: Config
//
//     constructor() {
//         this.config = new Config();
//
//         this.pool = new Pool({
//             user: this.config.get('DATABASE_USER'),
//             password: this.config.get('DATABASE_PASSWORD'),
//             host: this.config.get('DATABASE_HOST'),
//             port: +this.config.get('DATABASE_PORT'),
//             database: this.config.get('DATABASE_DBNAME')
//         })
//     }
//     public sendQuery<Response>(query: string): Promise<QueryResult<Response>> {
//         return this.pool.query<{user: string}>(query)
//     }
// }
//
// export const database = new Database()
