export interface IURLService{
    doesShortenURLAlreadyExist(shortenURL: string): Promise<boolean>
    saveShortenURL(shortenURL: string, fullUrl: string): Promise<void>
    findFullURLByShorten(shortenURL: string): Promise<string>
    findShortenURLByFull(fullURL: string): Promise<string>
}