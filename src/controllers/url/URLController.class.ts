import {IURLController} from "./URLController.interface";
import {NextFunction, Request, Response} from "express";
import {ApiError} from "../../exceptions/api-error.class";
import {URLService} from "../../service/URLService/URLService.class";

export class URLController implements IURLController{
    public async createAndSaveShortenURL(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { fullUrl, shortenUrl } = req.body

            if (typeof fullUrl != 'string' || typeof shortenUrl !== 'string'){
                throw ApiError.BadRequest()
            }
            if (await new URLService().doesShortenURLAlreadyExist(shortenUrl)){
                throw ApiError.Conflict('This name is already reserved')
            }

            await new URLService().saveShortenURL(shortenUrl, fullUrl)
            res.status(200).setHeader('content-type', 'text/plain').send(shortenUrl)
        } catch (e: unknown){
            console.log(e)
            next(e)
        }
    }
    public async redirectToFullURLByShorten(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const fullUrl = await new URLService().findFullURLByShorten(req.params.shortenUrl)

            res.redirect(fullUrl, 308)
        } catch (e: unknown){
            console.log(e)
            next(e)
        }
    }
    public async getShortenURlByFull(req: Request, res: Response, next: NextFunction){
        try{
            const { fullUrl } = req.params


            const shortenUrl = await new URLService().findShortenURLByFull(fullUrl)

            if (!shortenUrl){
                throw ApiError.BadRequest()
            }
            res.status(200).setHeader('content-type', 'text/plain').send(shortenUrl)
        } catch (e: unknown){
            console.log(e)
            next(e)
        }
    }
}
