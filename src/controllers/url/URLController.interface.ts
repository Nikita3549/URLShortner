import {NextFunction, Request, Response} from "express";

export interface IURLController{
    createAndSaveShortenURL(req: Request, res: Response, next: NextFunction): Promise<void>
    getShortenURlByFull(req: Request, res: Response, next: NextFunction): Promise<void>
    redirectToFullURLByShorten(req: Request, res: Response, next: NextFunction): Promise<void>
}