import {NextFunction, Router, Request, Response} from "express";
import {URLController} from "../controllers/url/URLController.class";

const router = Router()

router
    .get('/shortenUrl/get/:fullUrl', (req: Request, res: Response, next: NextFunction) => {
        new URLController().getShortenURlByFull(req, res, next)
    })

    .get('/shortenUrl/redirect/:shortenUrl', (req: Request, res: Response, next: NextFunction) => {
        new URLController().redirectToFullURLByShorten(req, res, next)
    })

    .post('/shortenUrl/create', (req: Request, res: Response, next: NextFunction) => {
        new URLController().createAndSaveShortenURL(req, res, next)
    })

export = router