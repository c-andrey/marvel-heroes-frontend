import { HeroesRequestType, HeroesResponseType, VoteHeroRequestType, VoteHeroResponseType } from "./heroes.types"

export interface RemoteHeroesInterface {
    voteHero: (body: VoteHeroRequestType) => Promise<VoteHeroResponseType>
    loadHeroesList: (params: HeroesRequestType) => Promise<HeroesResponseType>
}
