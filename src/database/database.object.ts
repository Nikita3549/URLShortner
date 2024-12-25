import {IDatabase} from "./database.interface";
import {Pool} from "pg";
import {Config} from "../config/config.class";

class Database implements IDatabase{
    private pool: Pool
    private config: Config

    constructor() {
        this.config = new Config();

        this.pool = new Pool({
            user: this.config.get('DATABASE_USER'),
            password: this.config.get('DATABASE_PASSWORD'),
            host: this.config.get('DATABASE_HOST'),
            database: this.config.get('DATABASE_DBNAME')
        })
    }
    public async sendQuery<TRes>(query: string | undefined): Promise<TRes> {
        if (!query){
            throw new Error('Query to database is empty')
        }
        return (await this.pool.query(query)).rows[0]
    }
}

export const database = new Database()

