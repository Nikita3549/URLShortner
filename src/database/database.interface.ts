export interface IDatabase{
    sendQuery(query: string): Promise<unknown>
}