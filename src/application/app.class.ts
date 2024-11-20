import {IApp} from "./app.interface";
import {Config} from "../config/config.class";
import express, {Express} from "express"
import cors from "cors"
import router from "../router";

export class App implements IApp{
    readonly PORT: number
    readonly app: Express

    constructor() {
        this.app = express()
        this.PORT = +new Config().get('DEV_PORT')

        this.setMiddlewares()
    }
    public async start() {
        try{
            this.app.listen(this.PORT,() => {
                console.log(`Server started on PORT ${this.PORT}`)
            })
        } catch (e: unknown){
            console.log((e as Error).message)
        }
    }
    private setMiddlewares(){
        this.app.disable('x-powered-by')
        this.app.use(cors())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(express.json())
        this.app.use('/api', router)
    }
}