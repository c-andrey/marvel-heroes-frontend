import { BadRequestError } from "@/errors/BadRequestError";
import { ServerError } from "@/errors/ServerError";
import { HttpClient, HttpStatusCode } from "@/infra/http/protocols/http-client.types";
import { HeroesRequestType, HeroesResponseType, VoteHeroRequestType, VoteHeroResponseType } from "@/interfaces/heroes/heroes.types";
import { RemoteHeroesInterface } from "@/interfaces/heroes/remote-heroes.types";

export class RemoteHeroes implements RemoteHeroesInterface {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpClient
    ) { }
    async loadHeroesList(params: HeroesRequestType): Promise<HeroesResponseType> {
        const httpResponse = await this.httpClient.request({
            url: this.url,
            method: 'get',
            params
        })

        switch (httpResponse.status) {
            case HttpStatusCode.ok: return httpResponse.data
            case HttpStatusCode.badRequest: throw new BadRequestError()
            case HttpStatusCode.serverError: throw new ServerError()
            default: throw new Error('Unexpected Error')
        }
    }

    async voteHero(body: VoteHeroRequestType): Promise<VoteHeroResponseType> {
        const httpResponse = await this.httpClient.request({
            url: `${this.url}/vote`,
            method: 'post',
            body
        })

        switch (httpResponse.status) {
            case HttpStatusCode.ok: return httpResponse.data
            case HttpStatusCode.badRequest: throw new BadRequestError()
            case HttpStatusCode.serverError: throw new ServerError()
            default: throw new Error('Unexpected Error')
        }
    }

}