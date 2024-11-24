import {IURLService} from "./URLService.interface";
import {database} from "../../database/database.object";
import {ApiError} from "../../exceptions/api-error.class";

export class URLService implements IURLService{
    public async doesShortenURLAlreadyExist(shortenURL: string): Promise<boolean> {
        const res = await database.sendQuery(`SELECT * FROM url WHERE short_url = '${shortenURL}';`)
        return !!res
    }
    public async saveShortenURL(shortenURL: string, fullUrl: string): Promise<void> {
        await database.sendQuery(`INSERT INTO url VALUES('${shortenURL}', '${fullUrl}');`)
    }
    public async findShortenURLByFull(fullURL: string): Promise<string> {
        const res = await database.sendQuery
            <{ short_url: string} | undefined>
            (`SELECT short_url FROM url WHERE full_url = '${fullURL}';`)

        if (!res || !res?.short_url){
            throw ApiError.BadRequest()
        }
        return res.short_url
    }
    public async findFullURLByShorten(shortenURL: string): Promise<string> {
        const res = await database.sendQuery
            <{ full_url: string} | undefined>
            (`SELECT full_url FROM url WHERE short_url = '${shortenURL}';`)

        if (!res || !res?.full_url){
            throw ApiError.BadRequest()
        }
        return res.full_url
    }
}